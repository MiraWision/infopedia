"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyByCode = exports.currencies = void 0;
exports.getCurrency = getCurrency;
const currencies_json_1 = __importDefault(require("./data/currencies.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "currencyByCode", { enumerable: true, get: function () { return maps_1.currencyByCode; } });
const currencies = Object.freeze(currencies_json_1.default);
exports.currencies = currencies;
function getCurrency(code) {
    return maps_1.currencyByCode[code];
}
