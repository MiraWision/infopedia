"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekdays = exports.months = void 0;
const months_json_1 = __importDefault(require("./data/months.json"));
const weekdays_json_1 = __importDefault(require("./data/weekdays.json"));
const months = Object.freeze(months_json_1.default);
exports.months = months;
const weekdays = Object.freeze(weekdays_json_1.default);
exports.weekdays = weekdays;
