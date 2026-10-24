// Pure data operations on the app state. Kept free of Svelte so they are easy to test
// and to reuse with another storage backend.
import { newId } from './storage.js';

export const avatars = ['🧔', '👦', '👧', '👩', '👨', '🧒', '👴', '👵'];
export const colors = ['#0f6e6a', '#e8692c', '#3b6fd4', '#b8417a', '#6b8e23', '#8a5cd0'];

export function ensureHousehold(data, name = 'Ons gezin') {
  if (data.households.length) return data.households[0];
  const household = { id: newId(), name, createdAt: new Date().toISOString() };
  data.households.push(household);
  return household;
}

export function addProfile(data, { name, kind = 'adult', avatar, color }) {
  const household = ensureHousehold(data);
  const profile = {
    id: newId(),
    householdId: household.id,
    name: name.trim(),
    kind,
    avatar: avatar ?? (kind === 'child' ? '👦' : '🧔'),
    color: color ?? colors[data.profiles.length % colors.length],
    createdAt: new Date().toISOString()
  };
  data.profiles.push(profile);
  return profile;
}

export function removeProfile(data, profileId) {
  data.profiles = data.profiles.filter((p) => p.id !== profileId);
  data.catches = data.catches.filter((c) => c.profileId !== profileId);
  if (data.settings.activeProfileId === profileId) data.settings.activeProfileId = null;
}

export function addCatch(data, profileId, speciesId, at = new Date()) {
  const entry = { id: newId(), profileId, speciesId, at: at.toISOString() };
  data.catches.push(entry);
  return entry;
}

export function removeCatch(data, catchId) {
  data.catches = data.catches.filter((c) => c.id !== catchId);
}

// Newest first.
export function catchesOf(data, profileId) {
  return data.catches.filter((c) => c.profileId === profileId).sort((a, b) => b.at.localeCompare(a.at));
}

export function caughtSpecies(data, profileId) {
  return new Set(data.catches.filter((c) => c.profileId === profileId).map((c) => c.speciesId));
}

export function catchCount(data, profileId, speciesId) {
  return data.catches.filter((c) => c.profileId === profileId && c.speciesId === speciesId).length;
}
