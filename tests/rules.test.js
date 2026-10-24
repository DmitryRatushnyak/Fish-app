import { describe, expect, it } from 'vitest';
import { lastSaturdayOfMay, isInSeason, warningsFor } from '../src/data/rules.js';
import { speciesById } from '../src/data/species.js';

describe('closed seasons', () => {
  it('finds the last Saturday of May', () => {
    expect(lastSaturdayOfMay(2026).getDate()).toBe(30);
    expect(lastSaturdayOfMay(2027).getDate()).toBe(29);
    expect(lastSaturdayOfMay(2025).getDate()).toBe(31);
  });

  it('closes pike from 1 March to the last Saturday of May', () => {
    expect(isInSeason('pike', new Date(2026, 1, 28))).toBe(false);
    expect(isInSeason('pike', new Date(2026, 2, 1, 7))).toBe(true);
    expect(isInSeason('pike', new Date(2026, 4, 30, 20))).toBe(true);
    expect(isInSeason('pike', new Date(2026, 4, 31))).toBe(false);
  });

  it('warns about perch in spring and pike release all year', () => {
    const perchMay = warningsFor(speciesById.baars, new Date(2026, 4, 10));
    expect(perchMay.map((w) => w.type)).toEqual(['closed', 'lureBan', 'minSize']);
    const pikeOct = warningsFor(speciesById.snoek, new Date(2026, 9, 24));
    expect(pikeOct.map((w) => w.type)).toEqual(['release']);
  });
});
