import { app } from './app.svelte.js';

const strings = {
  appName: { nl: 'Viskaart', en: 'Viskaart' },
  whoIsFishing: { nl: 'Wie gaat er vissen?', en: "Who's fishing?" },
  addProfile: { nl: 'Visser toevoegen', en: 'Add angler' },
  name: { nl: 'Naam', en: 'Name' },
  child: { nl: 'Kind', en: 'Child' },
  adult: { nl: 'Volwassene', en: 'Grown-up' },
  save: { nl: 'Opslaan', en: 'Save' },
  cancel: { nl: 'Annuleren', en: 'Cancel' },
  remove: { nl: 'Verwijderen', en: 'Remove' },
  confirmShort: { nl: 'Zeker weten?', en: 'Are you sure?' },
  confirmRemove: { nl: 'Weet je het zeker? Alle vangsten van deze visser gaan ook weg.', en: 'Are you sure? All catches of this angler are removed too.' },
  navNow: { nl: 'Nu', en: 'Now' },
  navBook: { nl: 'Visboek', en: 'Fish book' },
  navGear: { nl: 'Spullen', en: 'Gear' },
  navRules: { nl: 'Regels', en: 'Rules' },
  nowTitle: { nl: 'Wat bijt er nu?', en: 'What bites now?' },
  nowIntro: { nl: 'De beste vissen voor deze maand in de sloten, vaarten en rivieren rond Alblasserdam.', en: 'The best fish this month in the ditches, canals and rivers around Alblasserdam.' },
  closedNow: { nl: 'Nu gesloten tijd', en: 'Closed season now' },
  bookTitle: { nl: 'Mijn visboek', en: 'My fish book' },
  bookProgress: { nl: '{n} van {total} vissen gevangen', en: '{n} of {total} fish caught' },
  iCaughtIt: { nl: 'Gevangen!', en: 'I caught it!' },
  caughtTimes: { nl: '{n} keer gevangen', en: 'Caught {n} times' },
  newFish: { nl: 'Nieuwe vis in je visboek!', en: 'New fish in your fish book!' },
  readAloud: { nl: 'Voorlezen', en: 'Read aloud' },
  size: { nl: 'Lengte', en: 'Size' },
  upTo: { nl: 'tot {n} cm', en: 'up to {n} cm' },
  difficulty: { nl: 'Moeilijkheid', en: 'Difficulty' },
  bestMonths: { nl: 'Beste maanden', en: 'Best months' },
  bestTime: { nl: 'Beste tijd', en: 'Best time' },
  where: { nl: 'Waar', en: 'Where' },
  bait: { nl: 'Aas', en: 'Bait' },
  howTo: { nl: 'Zo vis je erop', en: 'How to fish for it' },
  hook: { nl: 'Haak', en: 'Hook' },
  line: { nl: 'Lijn', en: 'Line' },
  rod: { nl: 'Hengel', en: 'Rod' },
  rules: { nl: 'Regels', en: 'Rules' },
  noSpecialRules: { nl: 'Geen speciale landelijke regels. Kijk wel in de Visplanner.', en: 'No special national rules. Do check the Visplanner.' },
  warnClosed: { nl: '{season}: deze vis mag je nu niet vangen.', en: '{season}: you may not fish for it now.' },
  warnLureBan: { nl: 'Tot de laatste zaterdag van mei geen kunstaas of dood visje.', en: 'No lures or dead bait until the last Saturday of May.' },
  warnRelease: { nl: 'Altijd terugzetten.', en: 'Always put it back.' },
  warnMinSize: { nl: 'Minimummaat {cm} cm.', en: 'Minimum size {cm} cm.' },
  gearTitle: { nl: 'Spullen en tuigjes', en: 'Gear and rigs' },
  packing: { nl: 'Mee naar de waterkant', en: 'Take to the water' },
  rulesTitle: { nl: 'Regels', en: 'Rules' },
  closedSeasons: { nl: 'Gesloten tijden {year}', en: 'Closed seasons {year}' },
  sources: { nl: 'Bronnen', en: 'Sources' },
  rulesNote: { nl: 'Regels kunnen per water verschillen. Controleer altijd de Visplanner.', en: 'Rules can differ per water. Always check the Visplanner.' },
  settings: { nl: 'Instellingen', en: 'Settings' },
  language: { nl: 'Taal', en: 'Language' },
  switchProfile: { nl: 'Andere visser', en: 'Switch angler' },
  back: { nl: 'Terug', en: 'Back' },
  months: { nl: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  times: {
    nl: { dawn: 'Vroeg', day: 'Overdag', dusk: 'Avond', night: 'Nacht' },
    en: { dawn: 'Dawn', day: 'Daytime', dusk: 'Evening', night: 'Night' }
  },
  places: {
    nl: { canal: 'Vaart of kanaal', river: 'Rivier', polder: 'Polder en sloot', reeds: 'Bij het riet', harbour: 'Haven' },
    en: { canal: 'Canal', river: 'River', polder: 'Polder ditch', reeds: 'By the reeds', harbour: 'Harbour' }
  },
  welcome: { nl: 'Welkom! Maak eerst een visser aan, bijvoorbeeld papa en zoon.', en: 'Welcome! First add an angler, for example dad and son.' }
};

export function t(key, vars = {}) {
  const lang = app.settings.lang;
  let s = strings[key]?.[lang] ?? strings[key]?.nl ?? key;
  if (typeof s === 'string') for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

// Picks the right language from a { nl, en } object.
export const tr = (obj) => obj?.[app.settings.lang] ?? obj?.nl;
