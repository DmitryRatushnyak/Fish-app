import { createLocalAdapter } from './storage.js';

const adapter = createLocalAdapter();

export const app = $state(adapter.load());

export function persist() {
  adapter.save($state.snapshot(app));
}

export function activeProfile() {
  return app.profiles.find((p) => p.id === app.settings.activeProfileId) ?? null;
}

export const route = $state({ path: '/', params: {} });

function readHash() {
  const parts = (location.hash.replace(/^#/, '') || '/').split('/').filter(Boolean);
  route.path = '/' + (parts[0] ?? '');
  route.params = { id: parts[1] };
}

export function startRouter() {
  readHash();
  addEventListener('hashchange', () => {
    readHash();
    scrollTo(0, 0);
  });
}

export const go = (path) => (location.hash = path);
