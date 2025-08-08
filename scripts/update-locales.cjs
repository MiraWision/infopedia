#!/usr/bin/env node
/* eslint-disable no-console */
// Build main locales using CLDR territoryInfo official languages (official + de facto)
const https = require('https');
const fs = require('fs');
const path = require('path');

const CLDR_SUPPLEMENTAL_URL = 'https://raw.githubusercontent.com/unicode-org/cldr/main/common/supplemental/supplementalData.xml';

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

function loadLanguagesMap() {
  const languagesPath = path.join(__dirname, '..', 'src', 'data', 'languages.json');
  try {
    const raw = JSON.parse(fs.readFileSync(languagesPath, 'utf8'));
    const set = new Set(raw.map((l) => l.iso639_1));
    return set;
  } catch (e) {
    console.warn('Could not load languages.json; proceeding without filter');
    return null;
  }
}

function extractTerritoryInfo(xml) {
  const m = xml.match(/<territoryInfo[^>]*>([\s\S]*?)<\/territoryInfo>/);
  return m ? m[1] : '';
}

function parseLocalesFromTerritoryInfo(xmlInner, languagesSet) {
  const resultSet = new Set();
  const territoryRegex = /<territory\s+type="([A-Z]{2})"[\s\S]*?>[\s\S]*?<\/territory>/g; // only 2-letter regions
  let tMatch;
  while ((tMatch = territoryRegex.exec(xmlInner)) !== null) {
    const region = tMatch[1];
    const territoryBlock = tMatch[0];
    const langRegex = /<languagePopulation\s+([^>]*)\/>/g;
    let lMatch;
    while ((lMatch = langRegex.exec(territoryBlock)) !== null) {
      const attrs = lMatch[1];
      const typeMatch = attrs.match(/\btype="([a-z]{2})"/i);
      if (!typeMatch) continue;
      const lang = typeMatch[1].toLowerCase();
      if (languagesSet && !languagesSet.has(lang)) continue;
      const statusMatch = attrs.match(/\bofficialStatus="([^"]+)"/);
      if (!statusMatch) continue;
      const status = statusMatch[1];
      if (status === 'official' || status === 'de_facto_official') {
        resultSet.add(`${lang}-${region}`);
      }
    }
  }
  return Array.from(resultSet).sort();
}

async function main() {
  console.log('Fetching CLDR supplementalData.xml...');
  const xml = await fetchText(CLDR_SUPPLEMENTAL_URL);
  const territoryInner = extractTerritoryInfo(xml);
  if (!territoryInner) throw new Error('Failed to find <territoryInfo> in CLDR data');
  const languagesSet = loadLanguagesMap();
  const tags = parseLocalesFromTerritoryInfo(territoryInner, languagesSet);

  // Build Locale objects
  const locales = tags.map((tag) => {
    const [language, region] = tag.split('-');
    return { tag, language, region };
  });

  const outPath = path.join(__dirname, '..', 'src', 'data', 'locales.json');
  fs.writeFileSync(outPath, JSON.stringify(locales, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${locales.length} locales to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

