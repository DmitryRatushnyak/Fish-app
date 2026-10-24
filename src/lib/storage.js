// Storage adapter. Everything goes through load/save so the local store can later be
// swapped for a synced backend (accounts, several families) without touching the UI.

const KEY = 'viskaart:v1';

export const emptyData = () => ({
  version: 1,
  households: [],
  profiles: [],
  catches: [],
  settings: { lang: 'nl', activeProfileId: null }
});

export function createLocalAdapter(storage = globalThis.localStorage) {
  return {
    load() {
      try {
        const raw = storage?.getItem(KEY);
        return raw ? { ...emptyData(), ...JSON.parse(raw) } : emptyData();
      } catch {
        return emptyData();
      }
    },
    save(data) {
      try {
        storage?.setItem(KEY, JSON.stringify(data));
      } catch {
        // Storage full or blocked: the app keeps working for this session.
      }
    }
  };
}

export const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
