import type { Continent, USState } from './types';

import continentsData from './data/continents.json';
import usStatesData from './data/us-states.json';
import { usStateByCode } from './generated/maps';

const continents: ReadonlyArray<Continent> = Object.freeze(continentsData as Continent[]);
const usStates: ReadonlyArray<USState> = Object.freeze(usStatesData as USState[]);

function getUSState(code: string): USState | undefined {
  return usStateByCode[code.toUpperCase()];
}

export { continents, usStates, usStateByCode, getUSState };

