"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageBy639_2 = exports.languageBy639_1 = exports.languages = void 0;
exports.getLanguageBy639_1 = getLanguageBy639_1;
exports.getLanguageBy639_2 = getLanguageBy639_2;
const languages_json_1 = __importDefault(require("./data/languages.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "languageBy639_1", { enumerable: true, get: function () { return maps_1.languageBy639_1; } });
Object.defineProperty(exports, "languageBy639_2", { enumerable: true, get: function () { return maps_1.languageBy639_2; } });
const languages = Object.freeze(languages_json_1.default);
exports.languages = languages;
function getLanguageBy639_1(code) {
    return maps_1.languageBy639_1[code];
}
function getLanguageBy639_2(code) {
    return maps_1.languageBy639_2[code];
}
