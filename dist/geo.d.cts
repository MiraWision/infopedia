import { g as Continent, U as USState } from './types-Dsl_Lfik.cjs';
export { u as usStateByCode } from './maps-iAwPK6vE.cjs';

declare const continents: ReadonlyArray<Continent>;
declare const usStates: ReadonlyArray<USState>;
declare function getUSState(code: string): USState | undefined;

export { continents, getUSState, usStates };
