import { species } from '../data/species.js';
import { warningsFor } from '../data/rules.js';

// Fish worth trying this month, best first. Fish in their closed season drop to the end.
export function fishForNow(date = new Date()) {
  const month = date.getMonth();
  return species
    .map((fish) => {
      const warnings = warningsFor(fish, date);
      const closed = warnings.some((w) => w.type === 'closed');
      return { fish, score: closed ? 0 : fish.months[month], warnings, closed };
    })
    .filter((r) => r.fish.months[month] > 0)
    .sort((a, b) => b.score - a.score || a.fish.stars - b.fish.stars);
}

export function partOfDay(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 9) return 'dawn';
  if (h >= 9 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'dusk';
  return 'night';
}
