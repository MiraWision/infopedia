import type { Continent, USState } from './types';
import { usStateByCode } from './generated/maps';
declare const continents: ReadonlyArray<Continent>;
declare const usStates: ReadonlyArray<USState>;
declare function getUSState(code: string): USState | undefined;
export { continents, usStates, usStateByCode, getUSState };
