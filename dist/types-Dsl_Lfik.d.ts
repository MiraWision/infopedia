type ISO2 = string;
type ISO3 = string;
type Lang639_1 = string;
type Lang639_2 = string;
type Currency4217 = string;
type IANATimeZone = string;
type LocalizedName = {
    en: string;
    native?: string;
};
type Country = {
    name: LocalizedName;
    iso2: ISO2;
    iso3: ISO3;
    numeric: string;
    continent: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
    emojiFlag: string;
};
type CountryDial = {
    iso2: ISO2;
    dialCode: string;
};
type Continent = {
    code: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
    name: LocalizedName;
};
type Language = {
    name: LocalizedName;
    iso639_1?: Lang639_1;
    iso639_2: Lang639_2;
    direction?: "LTR" | "RTL";
    scripts?: string[];
};
type Locale = {
    tag: string;
    language: Lang639_1;
    region?: ISO2;
};
type TimeZone = {
    name: IANATimeZone;
    utcOffsetMinutes: number;
    observesDst: boolean;
    countryIso2?: ISO2;
};
type Currency = {
    code: Currency4217;
    name: LocalizedName;
    symbol: string;
    minorUnit: number;
};
type Month = {
    index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    name: string;
    short: string;
};
type Weekday = {
    index: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    name: string;
    short: string;
};
type USState = {
    name: string;
    code: string;
};

export type { Currency4217 as C, ISO2 as I, Lang639_1 as L, Month as M, TimeZone as T, USState as U, Weekday as W, ISO3 as a, Lang639_2 as b, IANATimeZone as c, LocalizedName as d, Country as e, CountryDial as f, Continent as g, Language as h, Locale as i, Currency as j };
