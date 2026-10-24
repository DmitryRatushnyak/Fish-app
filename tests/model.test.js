import { describe, expect, it } from 'vitest';
import { emptyData, createLocalAdapter } from '../src/lib/storage.js';
import { addProfile, addCatch, caughtSpecies, removeProfile, removeCatch, catchesOf } from '../src/lib/model.js';
import { species } from '../src/data/species.js';
import { fishForNow } from '../src/lib/season.js';

const memoryStorage = () => {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
};

describe('profiles and catches', () => {
  it('puts profiles in one household and keeps catches per profile', () => {
    const data = emptyData();
    const dad = addProfile(data, { name: 'Dmitry', kind: 'adult' });
    const son = addProfile(data, { name: 'Son', kind: 'child' });
    expect(data.households).toHaveLength(1);
    expect(dad.householdId).toBe(son.householdId);
    addCatch(data, son.id, 'baars');
    addCatch(data, son.id, 'baars');
    expect([...caughtSpecies(data, son.id)]).toEqual(['baars']);
    expect(caughtSpecies(data, dad.id).size).toBe(0);
    removeProfile(data, son.id);
    expect(data.catches).toHaveLength(0);
  });

  it('deletes one catch and lists newest first', () => {
    const data = emptyData();
    const son = addProfile(data, { name: 'Son', kind: 'child' });
    const old = addCatch(data, son.id, 'baars', new Date(2026, 5, 1));
    const recent = addCatch(data, son.id, 'brasem', new Date(2026, 6, 1));
    expect(catchesOf(data, son.id).map((c) => c.id)).toEqual([recent.id, old.id]);
    removeCatch(data, old.id);
    expect([...caughtSpecies(data, son.id)]).toEqual(['brasem']);
  });

  it('saves and loads through the storage adapter', () => {
    const adapter = createLocalAdapter(memoryStorage());
    const data = adapter.load();
    addProfile(data, { name: 'Dmitry' });
    adapter.save(data);
    expect(adapter.load().profiles[0].name).toBe('Dmitry');
  });
});

describe('species data', () => {
  it('has complete entries', () => {
    for (const s of species) {
      expect(s.months).toHaveLength(12);
      expect(s.name.nl && s.name.en && s.fact.nl && s.fact.en && s.tip.nl && s.tip.en).toBeTruthy();
    }
  });

  it('puts fish in closed season last', () => {
    const list = fishForNow(new Date(2026, 3, 15));
    const pike = list.findIndex((r) => r.fish.id === 'snoek');
    expect(pike === -1 || list[pike].score === 0).toBe(true);
  });
});
