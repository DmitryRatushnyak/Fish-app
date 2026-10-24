// Fish found in the canals, polder waters and rivers around Alblasserdam
// (Alblas, Noord, Lek and the Alblasserwaard polders).
//
// months: how active the fish is per month, Jan..Dec, 0 = hardly, 3 = best time.
// stars:  how hard it is for a young child to catch, 1 = easy, 3 = hard.
// rules:  closed season id (see rules.js), release = must always go back,
//         minSizeCm = legal minimum size if one applies nationally.
// art:    parameters for the drawn illustration (FishArt.svelte).

export const species = [
  {
    id: 'alver',
    name: { nl: 'Alver', en: 'Bleak' },
    latin: 'Alburnus alburnus',
    sizeCm: [10, 20],
    stars: 1,
    months: [0, 0, 1, 2, 2, 3, 3, 3, 3, 2, 1, 0],
    times: ['day'],
    places: ['canal', 'river'],
    baits: ['maggots', 'bread'],
    rig: 'float',
    hook: '18-22',
    line: '0,10-0,12 mm',
    fact: {
      nl: 'Alvers zwemmen in grote groepen vlak onder het water. Hun schubben glimmen als zilver!',
      en: 'Bleak swim in big groups just under the surface. Their scales shine like silver!'
    },
    tip: {
      nl: 'Vis ondiep, 20 tot 50 cm onder de dobber. Gooi af en toe een paar maden in, dan blijven ze bij je.',
      en: 'Fish shallow, 20 to 50 cm under the float. Throw in a few maggots now and then to keep them close.'
    },
    rules: {},
    art: { shape: 'slim', back: '#5b7d8c', side: '#cfdde3', belly: '#f4f8fa', fin: '#d9e2e6', pattern: 'none', dorsal: 'normal', barbels: 0, eye: 'big' }
  },
  {
    id: 'blankvoorn',
    name: { nl: 'Blankvoorn', en: 'Roach' },
    latin: 'Rutilus rutilus',
    sizeCm: [15, 35],
    stars: 1,
    months: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1],
    times: ['day', 'dusk'],
    places: ['canal', 'polder', 'river'],
    baits: ['maggots', 'bread', 'worms'],
    rig: 'float',
    hook: '16-18',
    line: '0,12-0,14 mm',
    fact: {
      nl: 'De blankvoorn heeft rode ogen. Het is de vis die je in Nederland het vaakst vangt.',
      en: 'Roach have red eyes. It is the fish people catch most often in the Netherlands.'
    },
    tip: {
      nl: 'Een made of een stukje brood aan een klein haakje, vlak boven de bodem. Kijk goed naar de dobber!',
      en: 'A maggot or a bit of bread on a small hook, just above the bottom. Watch the float closely!'
    },
    rules: {},
    art: { shape: 'normal', back: '#4d6a73', side: '#c9d6d6', belly: '#f2f5f2', fin: '#e0684b', pattern: 'none', dorsal: 'normal', barbels: 0, eye: 'red' }
  },
  {
    id: 'ruisvoorn',
    name: { nl: 'Ruisvoorn', en: 'Rudd' },
    latin: 'Scardinius erythrophthalmus',
    sizeCm: [15, 35],
    stars: 1,
    months: [0, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0, 0],
    times: ['day'],
    places: ['polder', 'canal', 'reeds'],
    baits: ['bread', 'maggots', 'corn'],
    rig: 'float',
    hook: '14-16',
    line: '0,14 mm',
    fact: {
      nl: 'De ruisvoorn lijkt op de blankvoorn, maar heeft knalrode vinnen en eet graag van het wateroppervlak.',
      en: 'Rudd look like roach, but have bright red fins and like to eat from the water surface.'
    },
    tip: {
      nl: 'Probeer een vlokje brood dat net blijft drijven, langs het riet. Op warme dagen komen ze naar boven.',
      en: 'Try a flake of bread that just floats, along the reeds. On warm days they come up to the surface.'
    },
    rules: {},
    art: { shape: 'deep', back: '#6b6a3a', side: '#d9c98a', belly: '#f5ecc8', fin: '#e23b2b', pattern: 'none', dorsal: 'back', barbels: 0, eye: 'gold' }
  },
  {
    id: 'brasem',
    name: { nl: 'Brasem', en: 'Bream' },
    latin: 'Abramis brama',
    sizeCm: [30, 70],
    stars: 1,
    months: [0, 0, 1, 2, 2, 3, 3, 3, 3, 2, 1, 0],
    times: ['dawn', 'dusk', 'night'],
    places: ['canal', 'river', 'polder'],
    baits: ['worms', 'maggots', 'corn'],
    rig: 'feeder',
    hook: '12-14',
    line: '0,18-0,20 mm',
    fact: {
      nl: 'Brasems zijn plat als een bord en zoeken in groepen hun eten in de modder.',
      en: 'Bream are flat like a plate and search the mud for food in groups.'
    },
    tip: {
      nl: 'Vis op de bodem met voer in een korfje. Belletjes in het water? Dan zijn er brasems!',
      en: 'Fish on the bottom with groundbait in a feeder. Bubbles in the water? Then bream are around!'
    },
    rules: {},
    art: { shape: 'deep', back: '#4b4a3a', side: '#a8a07a', belly: '#e6dfc4', fin: '#5b5a4f', pattern: 'none', dorsal: 'normal', barbels: 0, eye: 'normal' }
  },
  {
    id: 'baars',
    name: { nl: 'Baars', en: 'Perch' },
    latin: 'Perca fluviatilis',
    sizeCm: [15, 45],
    stars: 1,
    months: [1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 1],
    times: ['day', 'dawn'],
    places: ['canal', 'river', 'harbour'],
    baits: ['worms', 'maggots', 'lure'],
    rig: 'float',
    hook: '8-12',
    line: '0,16-0,18 mm',
    fact: {
      nl: 'De baars heeft tijgerstrepen en een stekelige rugvin. Pas op je vingers!',
      en: 'Perch have tiger stripes and a spiky back fin. Watch your fingers!'
    },
    tip: {
      nl: 'Een worm onder een dobber langs paaltjes, bruggen en steigers. Daar verstoppen baarsjes zich.',
      en: 'A worm under a float next to posts, bridges and jetties. That is where perch hide.'
    },
    rules: { closed: 'predatorSpring', minSizeCm: 22 },
    art: { shape: 'normal', back: '#3e5a2c', side: '#a7b660', belly: '#efe9c9', fin: '#e8692c', pattern: 'bars', dorsal: 'spiny', barbels: 0, eye: 'gold' }
  },
  {
    id: 'pos',
    name: { nl: 'Pos', en: 'Ruffe' },
    latin: 'Gymnocephalus cernua',
    sizeCm: [8, 20],
    stars: 1,
    months: [1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 1],
    times: ['day', 'dusk'],
    places: ['river', 'canal'],
    baits: ['worms', 'maggots'],
    rig: 'float',
    hook: '14-16',
    line: '0,12-0,14 mm',
    fact: {
      nl: 'De pos is een klein neefje van de baars, met slijm en stipjes. Hij voelt een beetje glibberig.',
      en: 'Ruffe are a small cousin of the perch, with slime and dots. They feel a bit slippery.'
    },
    tip: {
      nl: 'Een stukje worm op de bodem. Posjes bijten bijna altijd, ook als andere vissen niet willen.',
      en: 'A bit of worm on the bottom. Ruffe almost always bite, even when other fish will not.'
    },
    rules: {},
    art: { shape: 'normal', back: '#6a5e3a', side: '#b9aa70', belly: '#ece4c3', fin: '#b9aa70', pattern: 'dots', dorsal: 'spiny', barbels: 0, eye: 'big' }
  },
  {
    id: 'riviergrondel',
    name: { nl: 'Riviergrondel', en: 'Gudgeon' },
    latin: 'Gobio gobio',
    sizeCm: [8, 15],
    stars: 1,
    months: [0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
    times: ['day'],
    places: ['river'],
    baits: ['worms', 'maggots'],
    rig: 'float',
    hook: '18-20',
    line: '0,10-0,12 mm',
    fact: {
      nl: 'De grondel heeft twee snorharen en zoekt zijn eten met zijn mond op de bodem.',
      en: 'Gudgeon have two whiskers and search for food on the bottom with their mouth.'
    },
    tip: {
      nl: 'Laat het aas over de zandbodem slepen. Roer met je voet in ondiep water, dat lokt ze!',
      en: 'Let the bait drag over the sandy bottom. Stir the shallow water with your foot, it attracts them!'
    },
    rules: {},
    art: { shape: 'slim', back: '#5f5844', side: '#b5ab8c', belly: '#ede6d2', fin: '#9b9277', pattern: 'dots', dorsal: 'normal', barbels: 2, eye: 'normal' }
  },
  {
    id: 'zwartbekgrondel',
    name: { nl: 'Zwartbekgrondel', en: 'Round goby' },
    latin: 'Neogobius melanostomus',
    sizeCm: [8, 20],
    stars: 1,
    months: [0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
    times: ['day'],
    places: ['river', 'harbour'],
    baits: ['worms', 'maggots'],
    rig: 'float',
    hook: '12-16',
    line: '0,14 mm',
    fact: {
      nl: 'Deze vis kwam per schip uit de Zwarte Zee en woont nu tussen de stenen van de Noord en de Lek.',
      en: 'This fish came by ship from the Black Sea and now lives between the rocks of the Noord and the Lek.'
    },
    tip: {
      nl: 'Laat een stukje worm tussen de stenen van de oever zakken. Ze bijten heel gretig.',
      en: 'Lower a bit of worm between the rocks of the bank. They bite very eagerly.'
    },
    rules: {},
    art: { shape: 'goby', back: '#4a4436', side: '#8c8266', belly: '#d8d0b6', fin: '#5a5242', pattern: 'blotches', dorsal: 'goby', barbels: 0, eye: 'top' }
  },
  {
    id: 'winde',
    name: { nl: 'Winde', en: 'Ide' },
    latin: 'Leuciscus idus',
    sizeCm: [30, 60],
    stars: 2,
    months: [1, 1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 1],
    times: ['day', 'dusk'],
    places: ['river', 'canal'],
    baits: ['bread', 'maggots', 'lure'],
    rig: 'float',
    hook: '10-14',
    line: '0,18 mm',
    fact: {
      nl: 'De winde is een sterke riviervis die hard kan trekken. Soms springt hij naar insecten!',
      en: 'Ide are strong river fish that pull hard. Sometimes they jump for insects!'
    },
    tip: {
      nl: 'Vis met een dobber die met de stroming meedrijft, langs de kribben en de oever.',
      en: 'Use a float that drifts with the current, along the groynes and the bank.'
    },
    rules: {},
    art: { shape: 'normal', back: '#3f5560', side: '#b7c0bd', belly: '#eef0ea', fin: '#d78a63', pattern: 'none', dorsal: 'normal', barbels: 0, eye: 'gold' }
  },
  {
    id: 'zeelt',
    name: { nl: 'Zeelt', en: 'Tench' },
    latin: 'Tinca tinca',
    sizeCm: [25, 50],
    stars: 2,
    months: [0, 0, 0, 1, 3, 3, 3, 3, 2, 1, 0, 0],
    times: ['dawn', 'dusk'],
    places: ['polder', 'reeds'],
    baits: ['worms', 'corn', 'maggots'],
    rig: 'float',
    hook: '10-12',
    line: '0,20 mm',
    fact: {
      nl: 'De zeelt is groen als een kikker en heeft kleine rode oogjes. Hij houdt van rustig water met planten.',
      en: 'Tench are green like a frog and have small red eyes. They love calm water with plants.'
    },
    tip: {
      nl: 'Heel vroeg in de ochtend, met een worm of maiskorrel op de bodem naast waterplanten.',
      en: 'Very early in the morning, with a worm or sweetcorn on the bottom next to water plants.'
    },
    rules: {},
    art: { shape: 'normal', back: '#2f4a22', side: '#6f8a3c', belly: '#c8c27a', fin: '#2f4a22', pattern: 'none', dorsal: 'round', barbels: 2, eye: 'red' }
  },
  {
    id: 'karper',
    name: { nl: 'Karper', en: 'Carp' },
    latin: 'Cyprinus carpio',
    sizeCm: [40, 100],
    stars: 2,
    months: [0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
    times: ['dawn', 'dusk', 'night'],
    places: ['canal', 'polder', 'river'],
    baits: ['corn', 'boilies', 'bread'],
    rig: 'feeder',
    hook: '6-10',
    line: '0,30 mm',
    fact: {
      nl: 'Karpers kunnen ouder worden dan opa en zwaarder dan jij! Ze hebben vier snorharen.',
      en: 'Carp can grow older than grandpa and heavier than you! They have four whiskers.'
    },
    tip: {
      nl: 'Gebruik stevige lijn. Leg een paar maiskorrels op dezelfde plek en wees geduldig.',
      en: 'Use strong line. Put a few grains of sweetcorn in the same spot and be patient.'
    },
    rules: {},
    art: { shape: 'deep', back: '#5a4a24', side: '#b28c3c', belly: '#e9cf8a', fin: '#7a5a2a', pattern: 'scales', dorsal: 'long', barbels: 4, eye: 'normal' }
  },
  {
    id: 'paling',
    name: { nl: 'Paling', en: 'Eel' },
    latin: 'Anguilla anguilla',
    sizeCm: [40, 90],
    stars: 2,
    months: [0, 0, 0, 1, 2, 3, 3, 3, 2, 1, 0, 0],
    times: ['dusk', 'night'],
    places: ['canal', 'river', 'polder'],
    baits: ['worms'],
    rig: 'feeder',
    hook: '6-8',
    line: '0,25 mm',
    fact: {
      nl: 'Een paling lijkt op een slang, maar is echt een vis. Hij zwemt duizenden kilometers naar de zee om eitjes te leggen.',
      en: 'An eel looks like a snake, but it really is a fish. It swims thousands of kilometres to the sea to lay eggs.'
    },
    tip: {
      nl: 'Een dikke worm op de bodem als het donker wordt. De paling is zeldzaam: altijd voorzichtig terugzetten.',
      en: 'A big worm on the bottom when it gets dark. Eels are rare: always put them back carefully.'
    },
    rules: { release: true },
    art: { shape: 'eel', back: '#3c3a22', side: '#7a7440', belly: '#d8cf8c', fin: '#4a472c', pattern: 'none', dorsal: 'eel', barbels: 0, eye: 'small' }
  },
  {
    id: 'snoek',
    name: { nl: 'Snoek', en: 'Pike' },
    latin: 'Esox lucius',
    sizeCm: [50, 120],
    stars: 3,
    months: [2, 2, 0, 0, 0, 1, 1, 1, 2, 3, 3, 2],
    times: ['day', 'dawn'],
    places: ['polder', 'canal', 'reeds'],
    baits: ['lure', 'deadbait'],
    rig: 'lure',
    hook: 'dreg 4-1',
    line: '0,30 mm + staalonderlijn',
    fact: {
      nl: 'De snoek is de krokodil van de sloot. Hij ligt stil tussen de planten en schiet dan razendsnel op zijn prooi af.',
      en: 'Pike are the crocodile of the ditch. They lie still between the plants and then shoot at their prey.'
    },
    tip: {
      nl: 'Altijd een stalen onderlijn, want snoeken hebben scherpe tanden. Papa haalt de haak eruit.',
      en: 'Always use a steel leader, because pike have sharp teeth. Dad takes out the hook.'
    },
    rules: { closed: 'pike', release: true },
    art: { shape: 'long', back: '#33481f', side: '#7c9440', belly: '#e6e4b8', fin: '#8a7a3a', pattern: 'spots', dorsal: 'back', barbels: 0, eye: 'top' }
  },
  {
    id: 'snoekbaars',
    name: { nl: 'Snoekbaars', en: 'Zander' },
    latin: 'Sander lucioperca',
    sizeCm: [40, 90],
    stars: 3,
    months: [1, 1, 1, 0, 0, 1, 2, 2, 3, 3, 3, 2],
    times: ['dusk', 'night', 'dawn'],
    places: ['river', 'harbour', 'canal'],
    baits: ['lure', 'deadbait'],
    rig: 'dropshot',
    hook: '1-4',
    line: '0,12 mm gevlochten + fluorocarbon',
    fact: {
      nl: 'De snoekbaars heeft grote glimmende ogen waarmee hij in troebel en donker water kan jagen.',
      en: 'Zander have big shiny eyes so they can hunt in murky and dark water.'
    },
    tip: {
      nl: 'In de Noord bij stenen en havens, als het schemert. Een klein shadje langzaam over de bodem.',
      en: 'In the Noord near rocks and harbours, at dusk. A small soft shad slowly over the bottom.'
    },
    rules: { closed: 'predatorSpring' },
    art: { shape: 'long', back: '#4a5652', side: '#a9b2a6', belly: '#eceee6', fin: '#a9a88a', pattern: 'bars-faint', dorsal: 'spiny', barbels: 0, eye: 'glow' }
  },
  {
    id: 'meerval',
    name: { nl: 'Meerval', en: 'Wels catfish' },
    latin: 'Silurus glanis',
    sizeCm: [80, 220],
    stars: 3,
    months: [0, 0, 0, 1, 2, 3, 3, 3, 2, 1, 0, 0],
    times: ['night', 'dusk'],
    places: ['river'],
    baits: ['deadbait', 'worms', 'pellets'],
    rig: 'feeder',
    hook: '2/0-6/0',
    line: '0,50 mm of zwaar gevlochten',
    fact: {
      nl: 'De meerval is de grootste vis van onze rivieren. Hij kan langer worden dan papa!',
      en: 'The wels catfish is the biggest fish in our rivers. It can grow longer than dad!'
    },
    tip: {
      nl: 'Alleen voor grote mensen met zwaar materiaal. Zie je hem? Dan heb je een echt avontuur!',
      en: 'Only for grown-ups with heavy gear. If you see one, that is a real adventure!'
    },
    rules: {},
    art: { shape: 'catfish', back: '#2f3330', side: '#5d645a', belly: '#c9cbb8', fin: '#3a3f39', pattern: 'marble', dorsal: 'tiny', barbels: 6, eye: 'small' }
  },
  {
    id: 'stekelbaars',
    name: { nl: 'Driedoornige stekelbaars', en: 'Three-spined stickleback' },
    latin: 'Gasterosteus aculeatus',
    sizeCm: [4, 8],
    stars: 1,
    months: [0, 0, 1, 3, 3, 3, 3, 2, 2, 1, 0, 0],
    times: ['day'],
    places: ['polder', 'reeds'],
    baits: ['net'],
    rig: 'net',
    hook: '-',
    line: '-',
    fact: {
      nl: 'In de lente krijgt het mannetje een knalrode buik en bouwt hij een nestje voor de eitjes.',
      en: 'In spring the male gets a bright red belly and builds a nest for the eggs.'
    },
    tip: {
      nl: 'Vang ze met een schepnetje langs de kant. Even bekijken in een bakje water en weer terugzetten.',
      en: 'Catch them with a small net along the edge. Look at them in a tub of water and let them go again.'
    },
    rules: {},
    art: { shape: 'slim', back: '#4f6548', side: '#a7b79a', belly: '#e5553c', fin: '#c6cdb8', pattern: 'none', dorsal: 'spines3', barbels: 0, eye: 'big' }
  }
];

export const speciesById = Object.fromEntries(species.map((s) => [s.id, s]));
