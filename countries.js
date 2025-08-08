"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryByISO3 = exports.countryByISO2 = exports.countries = void 0;
exports.getCountryByISO2 = getCountryByISO2;
exports.getCountryByISO3 = getCountryByISO3;
exports.findCountriesByName = findCountriesByName;
const countries_json_1 = __importDefault(require("./data/countries.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "countryByISO2", { enumerable: true, get: function () { return maps_1.countryByISO2; } });
Object.defineProperty(exports, "countryByISO3", { enumerable: true, get: function () { return maps_1.countryByISO3; } });
const countries = Object.freeze(countries_json_1.default);
exports.countries = countries;
function getCountryByISO2(code) {
    return maps_1.countryByISO2[code];
}
function getCountryByISO3(code) {
    return maps_1.countryByISO3[code];
}
function findCountriesByName(q) {
    const needle = q.trim().toLowerCase();
    if (!needle)
        return [];
    return countries.filter((c) => { var _a; return c.name.en.toLowerCase().includes(needle) || (((_a = c.name.native) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '').includes(needle); });
}
