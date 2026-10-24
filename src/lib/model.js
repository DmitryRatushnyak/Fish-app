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
  for (const s of data.sessions ?? []) s.anglerIds = s.anglerIds.filter((id) => id !== profileId);
  if (data.settings.activeProfileId === profileId) data.settings.activeProfileId = null;
}

export function addCatch(data, profileId, speciesId, at = new Date(), extra = {}) {
  const entry = { id: newId(), profileId, speciesId, at: at.toISOString(), sessionId: null, photoId: null, ...extra };
  data.catches.push(entry);
  return entry;
}

// Returns the removed catch so the caller can also drop its photo.
export function removeCatch(data, catchId) {
  const gone = data.catches.find((c) => c.id === catchId);
  data.catches = data.catches.filter((c) => c.id !== catchId);
  return gone;
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

// Fishing sessions: one trip to the water, shared by everyone who came along.

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function addSession(data, { date = today(), place = null, anglerIds = [], rigs = [], baits = [], gearNote = '', notes = '', photoIds = [] }) {
  const household = ensureHousehold(data);
  const session = {
    id: newId(),
    householdId: household.id,
    date,
    place,
    anglerIds: [...anglerIds],
    rigs: [...rigs],
    baits: [...baits],
    gearNote: gearNote.trim(),
    notes: notes.trim(),
    photoIds: [...photoIds],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.sessions.push(session);
  return session;
}

export function updateSession(data, id, changes) {
  const session = data.sessions.find((s) => s.id === id);
  if (session) Object.assign(session, changes, { updatedAt: new Date().toISOString() });
  return session;
}

// Removing a session keeps its catches in everyone's fish book, just without the trip.
export function removeSession(data, id) {
  data.sessions = data.sessions.filter((s) => s.id !== id);
  for (const c of data.catches) if (c.sessionId === id) c.sessionId = null;
}

// Newest first.
export const sortedSessions = (data) =>
  [...data.sessions].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));

export const sessionCatches = (data, sessionId) =>
  data.catches.filter((c) => c.sessionId === sessionId).sort((a, b) => a.at.localeCompare(b.at));

// The trip a catch belongs to when someone taps "I caught it": today's session they are part of.
export const openSessionFor = (data, profileId, date = today()) =>
  sortedSessions(data).find((s) => s.date === date && s.anglerIds.includes(profileId)) ?? null;

// Places used before, most recent first, for quick picking.
export function knownPlaces(data) {
  const seen = new Map();
  for (const s of sortedSessions(data)) if (s.place?.name && !seen.has(s.place.name)) seen.set(s.place.name, s.place);
  return [...seen.values()];
}
