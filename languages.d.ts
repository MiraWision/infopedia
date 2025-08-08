import type { Language, Lang639_1, Lang639_2 } from './types';
import { languageBy639_1, languageBy639_2 } from './generated/maps';
declare const languages: ReadonlyArray<Language>;
declare function getLanguageBy639_1(code: Lang639_1): Language | undefined;
declare function getLanguageBy639_2(code: Lang639_2): Language | undefined;
export { languages, languageBy639_1, languageBy639_2, getLanguageBy639_1, getLanguageBy639_2 };
