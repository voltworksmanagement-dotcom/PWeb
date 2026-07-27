import config from '../data/live-counter.json';

/**
 * Deterministic "vehicles electrified" counter for a static site with no
 * backend. The number is a pure function of the clock and the baseline in
 * src/data/live-counter.json, so every visitor computes the same value, a
 * refresh can never reset it, and it only ever moves forward.
 *
 * Growth model:
 *  - each working day adds a pseudo-random quota of dailyMin..dailyMax units,
 *    seeded by the date so it is stable across devices and reloads;
 *  - Saturdays and Sundays add nothing;
 *  - within a working day the quota accrues linearly across the
 *    workStartHour..workEndHour window, so the count is frozen at night.
 *
 * When real sales figures come in, recalibrate by editing baseCount/baseDate
 * in the JSON.
 */

/** Stable hash -> [0,1) so a date key always yields the same "random" draw. */
function seededRandom(key: string): number {
  let h = 1779033703 ^ key.length;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function dayQuota(key: string): number {
  return config.dailyMin + Math.floor(seededRandom(key) * (config.dailyMax - config.dailyMin + 1));
}

function isWorkingDay(d: Date): boolean {
  const dow = d.getDay();
  return dow !== 0 && dow !== 6;
}

/** Fraction of today's working window already elapsed, clamped to 0..1. */
function workFraction(now: Date): number {
  const t = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  if (t <= config.workStartHour) return 0;
  if (t >= config.workEndHour) return 1;
  return (t - config.workStartHour) / (config.workEndHour - config.workStartHour);
}

export function liveVehicleCount(now: Date = new Date()): number {
  const [y, m, d] = config.baseDate.split('-').map(Number);
  const day = new Date(y, m - 1, d);
  const todayKey = dateKey(now);

  // Full quotas for every working day since the baseline (exclusive of today).
  let total = config.baseCount;
  while (dateKey(day) < todayKey) {
    if (isWorkingDay(day)) total += dayQuota(dateKey(day));
    day.setDate(day.getDate() + 1);
  }

  // Today's quota accrues over the working window.
  if (todayKey >= config.baseDate && isWorkingDay(now)) {
    total += Math.floor(dayQuota(todayKey) * workFraction(now));
  }

  return total;
}
