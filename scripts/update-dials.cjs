#!/usr/bin/env node
/* eslint-disable no-console */
// Build country dialing codes from mledoze/countries (IDD root+suffixes)
const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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

function normalizeDialCodes(idd) {
  if (!idd || !idd.root) return [];
  const root = idd.root; // includes leading '+'
  const suffixes = Array.isArray(idd.suffixes) ? idd.suffixes : [];
  const results = new Set();
  if (root === '+1') {
    // NANP: use +1 as the country calling code
    results.add('+1');
  } else if (suffixes.length === 0) {
    results.add(root);
  } else {
    for (const suf of suffixes) {
      const full = `${root}${suf || ''}`;
      results.add(full);
    }
  }
  return Array.from(results);
}

async function main() {
  console.log('Fetching countries dataset for dials...');
  const raw = await fetchJson(URL);
  if (!Array.isArray(raw)) throw new Error('Unexpected countries dataset');

  const list = [];
  for (const c of raw) {
    const iso2 = c.cca2;
    const idd = c.idd;
    if (!iso2 || !idd || !idd.root) continue;
    for (const dial of normalizeDialCodes(idd)) {
      list.push({ iso2, dialCode: dial });
    }
  }

  // Deduplicate
  const uniq = [];
  const seen = new Set();
  for (const r of list) {
    const key = `${r.iso2}|${r.dialCode}`;
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(r);
  }

  // Sort by dial then ISO2 for stable output
  uniq.sort((a, b) => (a.dialCode === b.dialCode ? a.iso2.localeCompare(b.iso2) : a.dialCode.localeCompare(b.dialCode)));

  const outPath = path.join(__dirname, '..', 'src', 'data', 'country-dials.json');
  fs.writeFileSync(outPath, JSON.stringify(uniq, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${uniq.length} dial entries to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

