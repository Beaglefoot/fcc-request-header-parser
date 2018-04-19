#!/usr/bin/env node

const express = require('express');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });

  console.log('--- GET ---');
});

app.listen(PORT, () =>
  console.log(`[${currentTime}] express is running at ${currentIp}:${PORT}`),
);
