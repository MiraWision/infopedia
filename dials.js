"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countriesByDial = exports.dialByISO2 = exports.countryDials = void 0;
exports.getDialByISO2 = getDialByISO2;
exports.getCountriesByDialCode = getCountriesByDialCode;
const country_dials_json_1 = __importDefault(require("./data/country-dials.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "dialByISO2", { enumerable: true, get: function () { return maps_1.dialByISO2; } });
Object.defineProperty(exports, "countriesByDial", { enumerable: true, get: function () { return maps_1.countriesByDial; } });
const countryDials = Object.freeze(country_dials_json_1.default);
exports.countryDials = countryDials;
function getDialByISO2(code) {
    return maps_1.dialByISO2[code];
}
function getCountriesByDialCode(dialCode) {
    return maps_1.countriesByDial[dialCode] || [];
}
