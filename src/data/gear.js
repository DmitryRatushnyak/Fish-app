// Rigs (how the line is set up) and baits, with simple steps a parent can do
// together with a child.

export const rigs = {
  float: {
    name: { nl: 'Dobber', en: 'Float' },
    rod: { nl: 'Vaste hengel of korte werphengel, 3 tot 5 meter', en: 'Pole or short rod, 3 to 5 metres' },
    steps: {
      nl: [
        'Schuif de dobber op de lijn.',
        'Zet loodjes onder de dobber, tot alleen het puntje boven water staat.',
        'Knoop een klein haakje aan het eind.',
        'Meet de diepte: het aas hangt net boven de bodem.',
        'Kijk naar de dobber. Gaat hij onder? Rustig aanslaan!'
      ],
      en: [
        'Slide the float onto the line.',
        'Pinch split shot under the float until only the tip sticks out.',
        'Tie a small hook to the end.',
        'Measure the depth: the bait hangs just above the bottom.',
        'Watch the float. Does it go under? Lift the rod gently!'
      ]
    }
  },
  feeder: {
    name: { nl: 'Grondvissen met voerkorf', en: 'Feeder (bottom fishing)' },
    rod: { nl: 'Feederhengel 3 tot 3,6 meter met molen', en: 'Feeder rod 3 to 3.6 metres with reel' },
    steps: {
      nl: [
        'Schuif een voerkorfje op de lijn en zet er een stopper onder.',
        'Knoop een onderlijn van 50 cm met haak.',
        'Vul het korfje met lokvoer.',
        'Werp steeds naar dezelfde plek.',
        'Zet de hengel neer en kijk naar het topje. Tikt het? Beet!'
      ],
      en: [
        'Slide a feeder onto the line with a stop bead below it.',
        'Tie a 50 cm hook length with a hook.',
        'Fill the feeder with groundbait.',
        'Cast to the same spot every time.',
        'Rest the rod and watch the tip. Does it twitch? A bite!'
      ]
    }
  },
  lure: {
    name: { nl: 'Spinnen met kunstaas', en: 'Lure fishing' },
    rod: { nl: 'Spinhengel 2,1 tot 2,7 meter, werpgewicht 10 tot 40 gram', en: 'Spinning rod 2.1 to 2.7 metres, 10 to 40 g casting weight' },
    steps: {
      nl: [
        'Knoop een stalen onderlijn aan de hoofdlijn (snoek!).',
        'Klik een plug, spinner of shad aan de karabijn.',
        'Werp langs het riet en draai rustig binnen.',
        'Varieer: snel, langzaam, even stoppen.',
        'Na de beet: een volwassene haalt de haak eruit.'
      ],
      en: [
        'Tie a steel leader to the main line (pike!).',
        'Clip a plug, spinner or shad to the snap.',
        'Cast along the reeds and reel in steadily.',
        'Vary it: fast, slow, short stops.',
        'After a catch: a grown-up removes the hook.'
      ]
    }
  },
  dropshot: {
    name: { nl: 'Dropshot', en: 'Drop shot' },
    rod: { nl: 'Lichte spinhengel 2,1 tot 2,4 meter', en: 'Light spinning rod 2.1 to 2.4 metres' },
    steps: {
      nl: [
        'Knoop een haakje met een palomarknoop, 30 tot 50 cm boven het einde.',
        'Zet onderaan een dropshotloodje.',
        'Prik een klein shadje of wormpje op de haak.',
        'Laat het lood de bodem raken en houd de lijn strak.',
        'Wiebel zachtjes met het topje, het lood blijft liggen.'
      ],
      en: [
        'Tie a hook with a palomar knot, 30 to 50 cm above the end.',
        'Put a drop shot weight on the end.',
        'Hook a small shad or worm.',
        'Let the weight touch the bottom and keep the line tight.',
        'Wiggle the rod tip gently, the weight stays on the bottom.'
      ]
    }
  },
  net: {
    name: { nl: 'Schepnet', en: 'Hand net' },
    rod: { nl: 'Een schepnetje en een emmer of bakje met slootwater', en: 'A small net and a bucket or tub with ditch water' },
    steps: {
      nl: [
        'Vul het bakje met water uit de sloot.',
        'Schep langzaam langs de planten aan de kant.',
        'Doe wat je vangt meteen in het bakje.',
        'Bekijk alles goed: vis, kikkervisjes, waterkevers!',
        'Zet alles terug op dezelfde plek.'
      ],
      en: [
        'Fill the tub with water from the ditch.',
        'Sweep the net slowly along the plants at the edge.',
        'Put what you catch into the tub straight away.',
        'Take a good look: fish, tadpoles, water beetles!',
        'Put everything back in the same spot.'
      ]
    }
  }
};

export const baits = {
  maggots: { nl: 'Maden', en: 'Maggots', icon: '🐛' },
  worms: { nl: 'Wormen', en: 'Worms', icon: '🪱' },
  bread: { nl: 'Brood', en: 'Bread', icon: '🍞' },
  corn: { nl: 'Mais', en: 'Sweetcorn', icon: '🌽' },
  boilies: { nl: 'Boilies', en: 'Boilies', icon: '🟤' },
  pellets: { nl: 'Pellets', en: 'Pellets', icon: '🟫' },
  lure: { nl: 'Kunstaas', en: 'Lures', icon: '🎣' },
  deadbait: { nl: 'Dood visje', en: 'Dead bait', icon: '🐟' },
  net: { nl: 'Schepnet', en: 'Net', icon: '🥅' }
};

export const packingList = {
  nl: ['VISpas of JeugdVISpas', 'Hengel en reservehaakjes', 'Aas in een koeltasje', 'Onthaaktang', 'Natte doek of handdoek', 'Meetlint', 'Zwemvest voor kinderen', 'Drinken en een broodje', 'Afvalzakje'],
  en: ['VISpas or Youth VISpas', 'Rod and spare hooks', 'Bait in a cool bag', 'Disgorger / forceps', 'Wet cloth or towel', 'Tape measure', 'Life jacket for kids', 'Drinks and a snack', 'Rubbish bag']
};
