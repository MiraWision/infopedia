#!/usr/bin/env node
/* eslint-disable no-console */
// Build full ISO-4217 current national currencies with symbols
const https = require('https');
const fs = require('fs');
const path = require('path');

const ISO_CSV_URL = 'https://raw.githubusercontent.com/datasets/currency-codes/main/data/codes-all.csv';
const SYMBOLS_URL_PRIMARY = 'https://gist.githubusercontent.com/ksafranski/2973986/raw/Common-Currency.json';

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

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const header = parseCsvLine(lines.shift());
  const rows = [];
  for (const line of lines) {
    const values = parseCsvLine(line);
    if (values.length === 1 && values[0] === '') continue; // skip blanks
    const obj = {};
    header.forEach((h, i) => (obj[h] = values[i] ?? ''));
    rows.push(obj);
  }
  return rows;
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

function toMinorUnit(v) {
  if (v === undefined || v === null || v === '') return 2;
  if (v === 'N.A.') return 2; // default; ISO uses N.A. for not applicable
  const n = Number(v);
  if (Number.isFinite(n)) return n;
  return 2;
}

function isNational(code, currencyName) {
  // Exclude funds/precious metals and special purpose codes starting with X
  if (!code) return false;
  if (code.startsWith('X')) return false;
  // Exclude 'No universal currency' placeholder
  if (/No universal currency/i.test(currencyName || '')) return false;
  return true;
}

async function main() {
  console.log('Fetching ISO 4217 CSV...');
  const csvText = await fetchText(ISO_CSV_URL);
  const rows = parseCsv(csvText);

  console.log('Fetching symbol map...');
  let symbolsMap = {};
  try {
    const symbolsText = await fetchText(SYMBOLS_URL_PRIMARY);
    const raw = JSON.parse(symbolsText);
    Object.keys(raw).forEach((code) => {
      const sym = raw[code]?.symbol || raw[code]?.symbol_native || raw[code]?.symbol_native;
      if (typeof sym === 'string' && sym.trim()) symbolsMap[code] = sym;
    });
  } catch (e) {
    console.warn('Symbol map fetch failed, proceeding without symbols');
  }

  const seen = new Set();
  const list = [];

  for (const r of rows) {
    const code = (r.AlphabeticCode || '').trim();
    const currency = (r.Currency || '').trim();
    const minor = toMinorUnit((r.MinorUnit || '').trim());
    const withdrawal = (r.WithdrawalDate || '').trim();

    // keep only current (no withdrawal date), valid 3-letter codes
    if (!code || code.length !== 3) continue;
    if (withdrawal) continue;
    if (!isNational(code, currency)) continue;
    if (seen.has(code)) continue;
    seen.add(code);

    const symbol = symbolsMap[code] || code; // fallback to code
    list.push({
      code,
      name: { en: currency },
      symbol,
      minorUnit: minor,
    });
  }

  // Sort by code for stable output
  list.sort((a, b) => a.code.localeCompare(b.code));

  const outPath = path.join(__dirname, '..', 'src', 'data', 'currencies.json');
  fs.writeFileSync(outPath, JSON.stringify(list, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${list.length} currencies to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

