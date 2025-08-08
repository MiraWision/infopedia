"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usStateByCode = exports.usStates = exports.continents = void 0;
exports.getUSState = getUSState;
const continents_json_1 = __importDefault(require("./data/continents.json"));
const us_states_json_1 = __importDefault(require("./data/us-states.json"));
const maps_1 = require("./generated/maps");
Object.defineProperty(exports, "usStateByCode", { enumerable: true, get: function () { return maps_1.usStateByCode; } });
const continents = Object.freeze(continents_json_1.default);
exports.continents = continents;
const usStates = Object.freeze(us_states_json_1.default);
exports.usStates = usStates;
function getUSState(code) {
    return maps_1.usStateByCode[code.toUpperCase()];
}
