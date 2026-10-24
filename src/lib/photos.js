// Photos live in IndexedDB on the phone (localStorage is too small for them).
// Each photo is shrunk to a JPEG of at most 1280 px before it is stored, so it is
// quick to show and, later, cheap to upload.
import { newId } from './storage.js';

const DB = 'viskaart-photos';
const STORE = 'photos';
const MAX = 1280;

let dbPromise;
function db() {
  dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function tx(mode, run) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const t = d.transaction(STORE, mode);
    const req = run(t.objectStore(STORE));
    t.oncomplete = () => resolve(req?.result);
    t.onerror = () => reject(t.error);
  });
}

export async function shrink(file, max = MAX) {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
}

export async function savePhoto(file) {
  const blob = await shrink(file);
  const id = newId();
  await tx('readwrite', (s) => s.put(blob, id));
  return id;
}

export const getPhoto = (id) => tx('readonly', (s) => s.get(id));
export const putPhoto = (id, blob) => tx('readwrite', (s) => s.put(blob, id));
export const deletePhoto = (id) => tx('readwrite', (s) => s.delete(id));

// Object URLs are cached so lists don't decode the same blob again and again.
const urls = new Map();
export async function photoUrl(id) {
  if (urls.has(id)) return urls.get(id);
  const blob = await getPhoto(id);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urls.set(id, url);
  return url;
}
