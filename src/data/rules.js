// National closed seasons for inland water (not the IJsselmeer), per the Visserijwet as
// summarised by Sportvisserij Nederland / Sportvisunie for 2026. Local waters can be
// stricter, so the app always points to the Visplanner for the exact spot.

export function lastSaturdayOfMay(year) {
  const d = new Date(year, 4, 31);
  d.setDate(31 - ((d.getDay() + 1) % 7));
  return d;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Each season returns its [start, end] (inclusive) for a given year.
export const closedSeasons = {
  pike: {
    name: { nl: 'Gesloten tijd snoek', en: 'Pike closed season' },
    range: (y) => [new Date(y, 2, 1), lastSaturdayOfMay(y)]
  },
  predatorSpring: {
    name: { nl: 'Gesloten tijd snoekbaars en baars', en: 'Zander and perch closed season' },
    range: (y) => [new Date(y, 3, 1), lastSaturdayOfMay(y)]
  },
  lureBan: {
    name: { nl: 'Verbod op kunstaas en dood visje', en: 'Ban on lures and dead bait' },
    range: (y) => [new Date(y, 3, 1), lastSaturdayOfMay(y)]
  }
};

export function isInSeason(seasonId, date = new Date()) {
  const season = closedSeasons[seasonId];
  if (!season) return false;
  const [start, end] = season.range(date.getFullYear());
  const day = startOfDay(date);
  return day >= start && day <= end;
}

// Baits that may not be used while the lure ban runs.
export const lureBanBaits = ['lure', 'deadbait'];

// Warnings for a species on a given date, as keys the UI can translate.
export function warningsFor(fish, date = new Date()) {
  const out = [];
  if (fish.rules.closed && isInSeason(fish.rules.closed, date)) {
    out.push({ type: 'closed', season: fish.rules.closed });
  }
  if (isInSeason('lureBan', date) && fish.baits.some((b) => lureBanBaits.includes(b))) {
    out.push({ type: 'lureBan', season: 'lureBan' });
  }
  if (fish.rules.release) out.push({ type: 'release' });
  if (fish.rules.minSizeCm) out.push({ type: 'minSize', cm: fish.rules.minSizeCm });
  return out;
}

export const generalRules = [
  {
    id: 'vispas',
    title: { nl: 'VISpas', en: 'VISpas (fishing licence)' },
    text: {
      nl: 'Vanaf 14 jaar heb je een VISpas nodig. Die koop je via een hengelsportvereniging, bijvoorbeeld in Alblasserdam.',
      en: 'From age 14 you need a VISpas. You buy it through a local angling club, for example in Alblasserdam.'
    }
  },
  {
    id: 'jeugd',
    title: { nl: 'JeugdVISpas', en: 'Youth VISpas' },
    text: {
      nl: 'Tot en met 13 jaar is er de goedkope JeugdVISpas, met minder hengels. Zonder eigen pas mag een kind vissen met een MeeVIStoestemming, onder toezicht van iemand met een VISpas.',
      en: 'Up to and including age 13 there is a cheap Youth VISpas, with fewer rods. Without their own pass a child may fish with a MeeVIStoestemming, supervised by a VISpas holder.'
    }
  },
  {
    id: 'rods',
    title: { nl: 'Aantal hengels', en: 'Number of rods' },
    text: {
      nl: 'Met een VISpas mag je met twee hengels vissen. Een derde hengel mag alleen met een extra toestemming op bepaalde wateren.',
      en: 'A VISpas allows two rods. A third rod needs extra permission and only on certain waters.'
    }
  },
  {
    id: 'night',
    title: { nl: "'s Nachts vissen", en: 'Night fishing' },
    text: {
      nl: 'Tussen zonsondergang en zonsopkomst heb je een NachtVIStoestemming nodig, en het water moet nachtvissen toestaan.',
      en: 'Between sunset and sunrise you need a NachtVIStoestemming, and the water must allow night fishing.'
    }
  },
  {
    id: 'release',
    title: { nl: 'Terugzetten', en: 'Putting fish back' },
    text: {
      nl: 'Snoek en paling gaan altijd terug. Maak je handen nat, houd de vis kort uit het water en zet hem rustig terug.',
      en: 'Pike and eel always go back. Wet your hands, keep the fish out of the water briefly and put it back gently.'
    }
  },
  {
    id: 'visplanner',
    title: { nl: 'Mag ik hier vissen?', en: 'May I fish here?' },
    text: {
      nl: 'Elk water heeft eigen regels. Kijk in de Visplanner-app van Sportvisserij Nederland voor jouw plek.',
      en: 'Every water has its own rules. Check the Visplanner app from Sportvisserij Nederland for your spot.'
    }
  }
];

export const rulesSources = [
  { label: 'Sportvisunie: gesloten tijd voor snoek', url: 'https://www.sportvisunie.nl/en/nieuws-media/actualiteiten/gesloten-tijd-voor-snoek-vanaf-1-maart' },
  { label: 'Sportvisbrigade: gesloten tijd 2026', url: 'https://www.sportvisbrigade.nl/viskennis/gesloten-tijd/' },
  { label: 'Hengelsport.nl: visregels 2026', url: 'https://hengelsport.nl/kennisbank/regels-en-vergunningen' }
];
