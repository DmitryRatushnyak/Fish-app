import { app } from './app.svelte.js';

const locale = () => (app.settings.lang === 'en' ? 'en-GB' : 'nl-NL');
// Session dates are plain days ("2026-10-24"); read them as local dates, not UTC.
const day = (d) => (typeof d === 'string' && d.length === 10 ? new Date(`${d}T12:00:00`) : new Date(d));

export const longDate = (d) => day(d).toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const shortDate = (d) => day(d).toLocaleDateString(locale(), { day: 'numeric', month: 'short', year: 'numeric' });
export const time = (iso) => new Date(iso).toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' });
