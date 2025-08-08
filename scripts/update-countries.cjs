#!/usr/bin/env node
/* eslint-disable no-console */
// Fetch and transform full ISO-3166 country data into our schema
const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // follow redirects
          return resolve(fetchJson(res.headers.location));
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          res.resume();
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function toContinentCode(region, subregion) {
  if (region === 'Africa') return 'AF';
  if (region === 'Europe') return 'EU';
  if (region === 'Oceania') return 'OC';
  if (region === 'Asia') return 'AS';
  if (region === 'Antarctic' || region === 'Antarctica') return 'AN';
  if (region === 'Americas') {
    if (subregion && /South/i.test(subregion)) return 'SA';
    return 'NA';
  }
  return 'NA';
}

function computeEmojiFlag(iso2) {
  const A_CODE = 0x1f1e6; // Regional Indicator Symbol Letter A
  return iso2
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(A_CODE + (c.charCodeAt(0) - 65)))
    .join('');
}

function firstNativeName(nativeName) {
  if (!nativeName || typeof nativeName !== 'object') return undefined;
  const keys = Object.keys(nativeName);
  if (keys.length === 0) return undefined;
  const first = nativeName[keys[0]];
  return first?.common || first?.official || undefined;
}

async function main() {
  console.log('Fetching countries dataset...');
  const raw = await fetchJson(URL);
  if (!Array.isArray(raw)) throw new Error('Unexpected countries dataset');

  const transformed = raw
    .filter((c) => c.cca2 && c.cca3 && c.ccn3 && c.name)
    .map((c) => {
      const iso2 = c.cca2;
      const iso3 = c.cca3;
      const numeric = String(c.ccn3).padStart(3, '0');
      const continent = toContinentCode(c.region, c.subregion);
      const nameEn = c.name?.common || iso2;
      const native = firstNativeName(c.name?.nativeName);
      const emojiFlag = c.flag || computeEmojiFlag(iso2);
      return {
        name: native ? { en: nameEn, native } : { en: nameEn },
        iso2,
        iso3,
        numeric,
        continent,
        emojiFlag,
      };
    })
    .sort((a, b) => a.iso2.localeCompare(b.iso2));

  const outPath = path.join(__dirname, '..', 'src', 'data', 'countries.json');
  fs.writeFileSync(outPath, JSON.stringify(transformed, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${transformed.length} countries to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

