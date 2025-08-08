import type { Language, Lang639_1, Lang639_2 } from './types';

import languagesData from './data/languages.json';
import { languageBy639_1, languageBy639_2 } from './generated/maps';

const languages: ReadonlyArray<Language> = Object.freeze(languagesData as Language[]);

function getLanguageBy639_1(code: Lang639_1): Language | undefined {
  return languageBy639_1[code];
}
function getLanguageBy639_2(code: Lang639_2): Language | undefined {
  return languageBy639_2[code];
}

export { languages, languageBy639_1, languageBy639_2, getLanguageBy639_1, getLanguageBy639_2 };

