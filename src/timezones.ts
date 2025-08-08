import type { TimeZone, IANATimeZone } from './types';

import timeZonesData from './data/time-zones.json';
import { timeZoneByName } from './generated/maps';

const timeZones: ReadonlyArray<TimeZone> = Object.freeze(timeZonesData as TimeZone[]);

function getTimeZone(name: IANATimeZone): TimeZone | undefined {
  return timeZoneByName[name];
}

export { timeZones, timeZoneByName, getTimeZone };

