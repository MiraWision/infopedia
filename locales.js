"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localesByLanguage = exports.localeByTag = exports.locales = void 0;
exports.getLocale = getLocale;
exports.getLocalesByLanguage = getLocalesByLanguage;
const locales_json_1 = __importDefault(require("./data/locales.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "localeByTag", { enumerable: true, get: function () { return maps_1.localeByTag; } });
Object.defineProperty(exports, "localesByLanguage", { enumerable: true, get: function () { return maps_1.localesByLanguage; } });
const locales = Object.freeze(locales_json_1.default);
exports.locales = locales;
function getLocale(tag) {
    return maps_1.localeByTag[tag];
}
function getLocalesByLanguage(lang) {
    return maps_1.localesByLanguage[lang] || [];
}
