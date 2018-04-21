#!/usr/bin/env node

const express = require('express');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();

app.use((req, _, next) => {
  console.log(`\x1b[33m--- ${req.method} ---\x1b[0m`);
  next();
});

app.use(express.static('public'));

app.get('/api/whoami', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });

  const { ip, headers } = req;
  const cleanedIp = (req.headers['x-forwarded-for'] || ip)
    .split(',')[0]
    .replace(/^.*?((?:\d{1,3}\.){3}\d{1,3}).*$/, '$1');
  const lang = (headers['accept-language'] || 'unknown').split(',')[0];
  const os = (
    [].concat(headers['user-agent'].match(/\(.+?\)/g))[0] || '(unknown)'
  ).slice(1, -1);

  res.json({ ip: cleanedIp, lang, os });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () =>
  console.log(
    `[${currentTime}] express is running at http://${currentIp}:${PORT}`
  )
);
