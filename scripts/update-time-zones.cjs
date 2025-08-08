#!/usr/bin/env node
/* eslint-disable no-console */
// Build main IANA time zones list from zone1970.tab with static metadata
const https = require('https');
const fs = require('fs');
const path = require('path');

// Use the canonical tzdb repo mirror on GitHub
const ZONE_TAB_URL = 'https://raw.githubusercontent.com/eggert/tz/main/zone1970.tab';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchText(res.headers.location));
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function parseZone1970Tab(text) {
  const zones = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    // Columns: cc\tcoordinates\tzone\tcomments...
    const [cc, _coords, zone] = line.split(/\s+/);
    if (!cc || !zone) continue;
    const countries = cc.split(',');
    zones.push({ zone, countryIso2: countries[0] });
  }
  return zones;
}

function parseOffsetToMinutes(label) {
  // Expect labels like 'GMT+02:00', 'GMT-05:30', or 'GMT'
  if (!label) return 0;
  const m = label.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const sign = m[1] === '-' ? -1 : 1;
  const hours = parseInt(m[2], 10) || 0;
  const mins = parseInt(m[3] || '0', 10) || 0;
  return sign * (hours * 60 + mins);
}

function getOffsetMinutes(zone, date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    timeZoneName: 'longOffset',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });
  const parts = fmt.formatToParts(date);
  const tzName = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
  return parseOffsetToMinutes(tzName);
}

function detectsDst(zone) {
  const year = new Date().getUTCFullYear();
  // Use mid-winter and mid-summer UTC dates to capture typical DST differences across hemispheres
  const jan = new Date(Date.UTC(year, 0, 1, 12, 0, 0));
  const jul = new Date(Date.UTC(year, 6, 1, 12, 0, 0));
  const offJan = getOffsetMinutes(zone, jan);
  const offJul = getOffsetMinutes(zone, jul);
  return offJan !== offJul;
}

async function main() {
  console.log('Fetching zone1970.tab...');
  const text = await fetchText(ZONE_TAB_URL);
  const baseZones = parseZone1970Tab(text);

  // Filter to zones supported by current ICU
  let supportedSet = null;
  if (typeof Intl.supportedValuesOf === 'function') {
    try {
      supportedSet = new Set(Intl.supportedValuesOf('timeZone'));
    } catch {}
  }
  const filtered = baseZones.filter(({ zone }) => {
    if (supportedSet) return supportedSet.has(zone);
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: zone }).format(new Date());
      return true;
    } catch {
      return false;
    }
  });

  const list = filtered.map(({ zone, countryIso2 }) => {
    // Use current offset; observesDst indicates seasonal change
    const now = new Date();
    let utcOffsetMinutes = 0;
    let observesDst = false;
    try {
      utcOffsetMinutes = getOffsetMinutes(zone, now);
      observesDst = detectsDst(zone);
    } catch {}
    return {
      name: zone,
      utcOffsetMinutes,
      observesDst,
      countryIso2,
    };
  });

  // Sort by name for stable output
  list.sort((a, b) => a.name.localeCompare(b.name));

  const outPath = path.join(__dirname, '..', 'src', 'data', 'time-zones.json');
  fs.writeFileSync(outPath, JSON.stringify(list, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${list.length} time zones to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

