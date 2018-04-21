#!/usr/bin/env node

const express = require('express');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();
app.use(express.static('public'));

app.get('/api/whoami', (req, res) => {
  // console.log('\x1b[33m', '--- GET ---', '\x1b[0m');

  res.set({
    'Access-Control-Allow-Origin': '*'
  });

  const { ip, headers } = req;
  const cleanedIp = ip.replace(/^.*?((?:\d{1,3}\.){3}\d{1,3}).*$/, '$1');
  const lang = (headers['accept-language'] || 'unknown').split(',')[0];
  const os = (
    [].concat(headers['user-agent'].match(/\(.+?\)/g))[0] || '(unknown)'
  ).slice(1, -1);

  res.json({ ip: cleanedIp, lang, os });
});

app.get('*', (req, res) => {
  console.log('\x1b[33m', '--- GET ---', '\x1b[0m');
  res.sendStatus(404);
});

app.listen(PORT, () =>
  console.log(`[${currentTime}] express is running at ${currentIp}:${PORT}`)
);
