"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeZoneByName = exports.timeZones = void 0;
exports.getTimeZone = getTimeZone;
const time_zones_json_1 = __importDefault(require("./data/time-zones.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "timeZoneByName", { enumerable: true, get: function () { return maps_1.timeZoneByName; } });
const timeZones = Object.freeze(time_zones_json_1.default);
exports.timeZones = timeZones;
function getTimeZone(name) {
    return maps_1.timeZoneByName[name];
}
