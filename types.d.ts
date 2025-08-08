export type ISO2 = string;
export type ISO3 = string;
export type Lang639_1 = string;
export type Lang639_2 = string;
export type Currency4217 = string;
export type IANATimeZone = string;
export type LocalizedName = {
    en: string;
    native?: string;
};
export type Country = {
    name: LocalizedName;
    iso2: ISO2;
    iso3: ISO3;
    numeric: string;
    continent: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
    emojiFlag: string;
};
export type CountryDial = {
    iso2: ISO2;
    dialCode: string;
};
export type Continent = {
    code: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
    name: LocalizedName;
};
export type Language = {
    name: LocalizedName;
    iso639_1?: Lang639_1;
    iso639_2: Lang639_2;
    direction?: "LTR" | "RTL";
    scripts?: string[];
};
export type Locale = {
    tag: string;
    language: Lang639_1;
    region?: ISO2;
};
export type TimeZone = {
    name: IANATimeZone;
    utcOffsetMinutes: number;
    observesDst: boolean;
    countryIso2?: ISO2;
};
export type Currency = {
    code: Currency4217;
    name: LocalizedName;
    symbol: string;
    minorUnit: number;
};
export type Month = {
    index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    name: string;
    short: string;
};
export type Weekday = {
    index: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    name: string;
    short: string;
};
export type USState = {
    name: string;
    code: string;
};
