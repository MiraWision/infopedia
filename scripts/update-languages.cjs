#!/usr/bin/env node
/* eslint-disable no-console */
// Build ISO 639-1 main languages, mapping to 639-2 and tagging RTL where applicable
const https = require('https');
const fs = require('fs');
const path = require('path');

const ISO_639_1_URL = 'https://raw.githubusercontent.com/haliaeetus/iso-639/master/data/iso_639-1.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchJson(res.headers.location));
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
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

// ISO 639-1 codes generally used with RTL scripts
const RTL_CODES = new Set([
  'ar', // Arabic
  'dv', // Dhivehi
  'fa', // Persian
  'he', // Hebrew
  'ks', // Kashmiri (often Arabic script)
  'ku', // Kurdish (Sorani is RTL; Kurmanji is Latin). We tag as RTL for conservative UI
  'ps', // Pashto
  'sd', // Sindhi
  'ug', // Uyghur
  'ur', // Urdu
  'yi', // Yiddish
]);

function normEnglishName(name) {
  // Some names contain semicolons separating variants; take first for compactness
  if (typeof name !== 'string') return '';
  const first = name.split(';')[0].trim();
  // Remove parenthetical qualifiers for brevity
  return first.replace(/\s*\([^)]*\)\s*/g, '').trim() || first;
}

async function main() {
  console.log('Fetching ISO 639-1 languages...');
  const map = await fetchJson(ISO_639_1_URL);
  if (!map || typeof map !== 'object') throw new Error('Unexpected iso_639-1 payload');

  const list = Object.keys(map)
    .sort()
    .map((code) => {
      const entry = map[code];
      const enName = normEnglishName(entry?.name || '');
      const native = typeof entry?.nativeName === 'string' ? entry.nativeName.trim() : undefined;
      /** Prefer terminologic 639-2 code */
      const iso2 = (entry?.['639-2'] || '').trim();
      const item = {
        name: native ? { en: enName, native } : { en: enName },
        iso639_1: code,
        iso639_2: iso2,
      };
      if (RTL_CODES.has(code)) item.direction = 'RTL';
      return item;
    })
    .filter((l) => l.iso639_1 && l.iso639_2 && l.name.en);

  const outPath = path.join(__dirname, '..', 'src', 'data', 'languages.json');
  fs.writeFileSync(outPath, JSON.stringify(list, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${list.length} languages to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

