// Curated corridors, not a timetable. Coordinates intentionally simplify geography.
const cities = {
  london: { name: 'London', country: 'United Kingdom', station: 'St Pancras International', x: 85, y: 250, note: 'Allow time for Eurostar check-in, security and border checks.', url: 'https://www.eurostar.com/' },
  paris: { name: 'Paris', country: 'France', station: 'Gare du Nord · Gare de Lyon · Gare de l’Est', x: 225, y: 390, hub: true, note: 'Connections across Paris may require a change of station. Leave time for the transfer.', url: 'https://www.sncf-connect.com/en-en/' },
  brussels: { name: 'Brussels', country: 'Belgium', station: 'Bruxelles-Midi / Brussel-Zuid', x: 265, y: 250, note: 'Midi and Zuid are the French and Dutch names for the same station.', url: 'https://www.b-europe.com/EN' },
  amsterdam: { name: 'Amsterdam', country: 'Netherlands', station: 'Amsterdam Centraal', x: 365, y: 150, note: 'An international gateway for Eurostar, ICE and overnight travel.', url: 'https://www.nsinternational.com/en' },
  cologne: { name: 'Cologne', country: 'Germany', station: 'Köln Hbf', x: 445, y: 290, note: 'The main station is right beside the cathedral.', url: 'https://www.bahn.com/en' },
  frankfurt: { name: 'Frankfurt', country: 'Germany', station: 'Frankfurt (Main) Hbf', x: 525, y: 370, hub: true, note: 'The central station and Frankfurt Airport’s long-distance station are separate stops.', url: 'https://www.bahn.com/en' },
  hamburg: { name: 'Hamburg', country: 'Germany', station: 'Hamburg Hbf · Hamburg-Altona · Hamburg-Harburg', x: 605, y: 90, hub: true, note: 'Check your station: European Sleeper uses Harburg; Nightjet also serves Altona. RDC EuroNight may start or end here instead of Berlin on some days.', url: 'https://www.bahn.com/en' },
  berlin: { name: 'Berlin', country: 'Germany', station: 'Berlin Hbf · Gesundbrunnen · Lichtenberg · Spandau', x: 765, y: 210, hub: true, note: 'Night train stations vary by operator, direction and date. European Sleeper uses Gesundbrunnen or Spandau; RDC also uses Lichtenberg. Check your ticket.', url: 'https://www.bahn.com/en' },
  warsaw: { name: 'Warsaw', country: 'Poland', station: 'Warszawa Centralna · Warszawa Wschodnia', x: 955, y: 210, note: 'Check the Warsaw station shown on your ticket; international services can use different stops.', url: 'https://www.intercity.pl/en/' },
  prague: { name: 'Prague', country: 'Czechia', station: 'Praha hlavní nádraží', x: 765, y: 350, note: 'The main station is a short walk from the city centre.', url: 'https://www.cd.cz/en/' },
  zurich: { name: 'Zurich', country: 'Switzerland', station: 'Zürich HB', x: 465, y: 510, hub: true, note: 'A compact interchange for routes through Switzerland and across the Alps.', url: 'https://www.sbb.ch/en' },
  munich: { name: 'Munich', country: 'Germany', station: 'München Hbf', x: 645, y: 470, note: 'A key interchange for Bavaria, Austria and Italy.', url: 'https://www.bahn.com/en' },
  vienna: { name: 'Vienna', country: 'Austria', station: 'Wien Hbf', x: 845, y: 470, hub: true, note: 'A major Nightjet hub. Reserve a couchette or sleeper when booking overnight travel.', url: 'https://www.oebb.at/en/' },
  budapest: { name: 'Budapest', country: 'Hungary', station: 'Budapest-Keleti · Budapest-Kelenföld', x: 955, y: 580, note: 'Check your arrival station: Budapest has several long-distance terminals.', url: 'https://www.mavcsoport.hu/en' },
  lyon: { name: 'Lyon', country: 'France', station: 'Lyon Part-Dieu', x: 285, y: 510, note: 'Part-Dieu is the main interchange for the routes shown here.', url: 'https://www.sncf-connect.com/en-en/' },
  barcelona: { name: 'Barcelona', country: 'Spain', station: 'Barcelona Sants', x: 145, y: 650, note: 'Check reservation requirements for international high-speed services.', url: 'https://www.renfe.com/es/en' },
  milan: { name: 'Milan', country: 'Italy', station: 'Milano Centrale · Milano Porta Garibaldi', x: 465, y: 650, note: 'European Sleeper uses Porta Garibaldi, a different station from Centrale. Allow time to transfer.', url: 'https://www.trenitalia.com/en.html' },
  venice: { name: 'Venice', country: 'Italy', station: 'Venezia Santa Lucia', x: 645, y: 610, note: 'Santa Lucia is on the island; Venezia Mestre is on the mainland.', url: 'https://www.trenitalia.com/en.html' },
  rome: { name: 'Rome', country: 'Italy', station: 'Roma Termini', x: 765, y: 670, note: 'Check your ticket: some long-distance services also use Roma Tiburtina.', url: 'https://www.trenitalia.com/en.html' },
  copenhagen: { name: 'Copenhagen', country: 'Denmark', station: 'København H · København Syd · Copenhagen Airport · Høje Taastrup', x: 605, y: -10, hub: true, note: 'Snälltåget uses København Syd. RDC EuroNight uses Copenhagen Airport, with København Syd added in the December 2026 timetable. The seasonal Alps train uses Høje Taastrup.', url: 'https://www.dsb.dk/en/' },
  malmo: { name: 'Malmö', country: 'Sweden', station: 'Malmö C', x: 765, y: -10, note: 'Change here between Snälltåget’s Berlin night train and daytime trains to Gothenburg and Oslo. RDC EuroNight stops in Lund, not Malmö.', url: 'https://www.snalltaget.se/en' },
  gothenburg: { name: 'Gothenburg', country: 'Sweden', station: 'Göteborg C · Göteborg-Gamlestaden · Göteborg-Mölndal', x: 705, y: -110, note: 'Snälltåget’s Oslo–Malmö service calls at Gamlestaden and Mölndal rather than Göteborg C.', url: 'https://www.snalltaget.se/en/malmo-gothenburg-oslo' },
  stockholm: { name: 'Stockholm', country: 'Sweden', station: 'Stockholm Central', x: 905, y: -170, hub: true, note: 'RDC EuroNight and Snälltåget offer separate night services to Germany. Domestic night trains continue towards the mountains and Arctic Sweden.', url: 'https://www.sj.se/en' },
  oslo: { name: 'Oslo', country: 'Norway', station: 'Oslo S', x: 645, y: -210, hub: true, note: 'A hub for the Bergen and Trondheim lines. Continue south via Gothenburg and Malmö for connections to Denmark and Germany.', url: 'https://entur.no/' },
  bergen: { name: 'Bergen', country: 'Norway', station: 'Bergen stasjon', x: 465, y: -290, note: 'The Bergen Line links the west coast with Oslo by day and overnight.', url: 'https://www.vy.no/en' },
  trondheim: { name: 'Trondheim', country: 'Norway', station: 'Trondheim S', x: 645, y: -350, note: 'SJ Nord runs daytime and overnight services on the Dovre Line to Oslo.', url: 'https://www.sj.no/en/plan-your-journey/night-train/' },
  storlien: { name: 'Storlien', country: 'Sweden', station: 'Storlien station', x: 805, y: -310, note: 'Snälltåget’s mountain night train runs on selected dates in winter and summer. Check onward services separately for travel into Norway.', url: 'https://www.snalltaget.se/tag-till-storlien' },
  narvik: { name: 'Narvik', country: 'Norway', station: 'Narvik stasjon', x: 945, y: -390, note: 'The overnight connection to Stockholm runs through Sweden. Narvik is not connected by rail to Norway’s main north–south network.', url: 'https://www.sj.se/en' },
  innsbruck: { name: 'Innsbruck', country: 'Austria', station: 'Innsbruck Hbf', x: 645, y: 560, note: 'Snälltåget’s Malmö–Austria night train is seasonal. The published winter season runs from 18 December 2026 to 14 March 2027.', url: 'https://www.snalltaget.se/en/austria' },
  basel: { name: 'Basel', country: 'Switzerland', station: 'Basel SBB · Basel Bad Bf', x: 365, y: 470, hub: true, note: 'A cross-border hub with Nightjet services to Hamburg, Berlin and Amsterdam. Basel SBB and Basel Bad Bf are separate stations; check the stop on your ticket.', url: 'https://www.sbb.ch/en/leisure-holidays/europe/night-trains/nightjet.html' },
};

// Each route joins the named cities; bends are not additional station stops.
const routes = [
  ['london', 'paris', 'Eurostar', '85,250 85,310 165,390 225,390'],
  ['london', 'brussels', 'Eurostar', '85,250 265,250'],
  ['paris', 'brussels', 'Eurostar', '225,390 225,290 265,250'],
  ['brussels', 'amsterdam', 'Eurostar', '265,250 365,150'],
  ['brussels', 'cologne', 'Eurostar / ICE', '265,250 405,250 445,290'],
  ['amsterdam', 'cologne', 'ICE', '365,150 365,210 445,290'],
  ['cologne', 'frankfurt', 'ICE', '445,290 525,370'],
  ['frankfurt', 'hamburg', 'ICE', '525,370 525,170 605,90'],
  ['hamburg', 'berlin', 'ICE / IC', '605,90 645,90 765,210'],
  ['berlin', 'warsaw', 'EuroCity', '765,210 955,210'],
  ['berlin', 'prague', 'EuroCity / Railjet', '765,210 765,350'],
  ['berlin', 'munich', 'ICE', '765,210 705,270 705,410 645,470'],
  ['prague', 'vienna', 'Railjet', '765,350 765,390 845,470'],
  ['frankfurt', 'munich', 'ICE', '525,370 545,370 645,470'],
  ['frankfurt', 'zurich', 'ICE / EuroCity', '525,370 525,450 465,510'],
  ['paris', 'frankfurt', 'ICE / TGV', '225,390 325,390 345,370 525,370'],
  ['paris', 'zurich', 'TGV Lyria', '225,390 285,390 365,470 405,470 445,510 465,510', 'day', { stops: ['paris', 'basel', 'zurich'] }],
  ['frankfurt', 'basel', 'ICE / EuroCity', '525,370 465,370 365,470'],
  ['basel', 'zurich', 'SBB InterCity', '365,470 405,470 445,510 465,510'],
  ['paris', 'lyon', 'TGV', '225,390 225,450 285,510'],
  ['lyon', 'barcelona', 'AVE', '285,510 145,650'],
  ['zurich', 'milan', 'EuroCity', '465,510 465,650'],
  ['zurich', 'munich', 'EuroCity', '465,510 605,510 645,470'],
  ['munich', 'vienna', 'Railjet', '645,470 845,470'],
  ['vienna', 'budapest', 'Railjet / EuroCity', '845,470 955,580'],
  ['milan', 'venice', 'Frecciarossa', '465,650 605,650 645,610'],
  ['milan', 'rome', 'Frecciarossa / Italo', '465,650 505,690 745,690 765,670'],
  ['venice', 'rome', 'Frecciarossa / Italo', '645,610 705,610 765,670'],
  ['amsterdam', 'zurich', 'Nightjet', '365,150 335,180 335,300 365,330 365,470 405,470 445,510 465,510', 'night', { stops: ['amsterdam', 'basel', 'zurich'], url: 'https://www.sbb.ch/en/leisure-holidays/europe/night-trains/nightjet.html' }],
  ['hamburg', 'zurich', 'Nightjet', '605,90 495,200 495,400 425,470 365,470 385,490 445,490 465,510', 'night', { stops: ['hamburg', 'basel', 'zurich'], url: 'https://www.sbb.ch/en/leisure-holidays/europe/night-trains/nightjet.html' }],
  ['berlin', 'zurich', 'Nightjet', '765,210 735,240 735,400 685,450 385,450 365,470 385,490 445,490 465,510', 'night', { stops: ['berlin', 'basel', 'zurich'], url: 'https://www.sbb.ch/en/leisure-holidays/europe/night-trains/nightjet.html' }],
  ['zurich', 'vienna', 'Nightjet', '465,510 505,550 765,550 845,470', 'night'],
  ['vienna', 'rome', 'Nightjet', '845,470 875,500 875,560 765,670', 'night'],
  ['hamburg', 'stockholm', 'Snälltåget', '605,90 605,-10 765,-10 805,-50 805,-70 905,-170', 'day', { stops: ['hamburg', 'copenhagen', 'malmo', 'stockholm'], url: 'https://www.snalltaget.se/en/day-train-hamburg-copenhagen-stockholm' }],
  ['malmo', 'oslo', 'Snälltåget', '765,-10 705,-70 705,-110 645,-170 645,-210', 'day', { stops: ['malmo', 'gothenburg', 'oslo'], url: 'https://www.snalltaget.se/en/malmo-gothenburg-oslo' }],
  ['oslo', 'stockholm', 'SJ', '645,-210 865,-210 905,-170'],
  ['gothenburg', 'stockholm', 'SJ', '705,-110 845,-110 905,-170'],
  ['oslo', 'bergen', 'Vy · Bergen Line', '645,-210 545,-210 465,-290'],
  ['oslo', 'trondheim', 'SJ Nord · Dovre Line', '645,-210 645,-350'],
  ['munich', 'innsbruck', 'EuroCity / Railjet', '645,470 645,560'],
  ['oslo', 'bergen', 'Vy · Bergen Line', '645,-210 625,-230 545,-230 485,-290 465,-290', 'night', { url: 'https://www.vy.no/en/buy-tickets/train-tickets/sleeper' }],
  ['oslo', 'trondheim', 'SJ Nord · Dovre Line', '645,-210 625,-230 625,-330 645,-350', 'night', { url: 'https://www.sj.no/en/plan-your-journey/night-train/' }],
  ['stockholm', 'narvik', 'SJ', '905,-170 965,-230 965,-370 945,-390', 'night', { url: 'https://www.sj.se/en/about-the-journey/sj-night-train', note: 'Via northern Sweden; check dates for engineering works.' }],
  ['berlin', 'stockholm', 'RDC EuroNight', '765,210 745,210 625,90 605,90 585,70 585,10 605,-10 635,-40 755,-40 885,-170 905,-170', 'night', { stops: ['berlin', 'hamburg', 'copenhagen', 'stockholm'], url: 'https://www.nachtexpress.de/en/timetable/', note: 'Selected days, year-round. Some services start or end in Hamburg. Copenhagen stop: Airport; Lund is the stop near Malmö.' }],
  ['berlin', 'stockholm', 'Snälltåget', '765,210 765,190 665,90 605,90 625,70 625,10 605,-10 625,-30 745,-30 765,-10 825,-70 825,-90 905,-170', 'night', { stops: ['berlin', 'hamburg', 'copenhagen', 'malmo', 'stockholm'], url: 'https://www.snalltaget.se/en/berlin', note: 'Selected dates; seasonal winter pause after 7 January 2027. Copenhagen stop: København Syd. The Malmö–Stockholm section is travelled in daytime.' }],
  ['malmo', 'storlien', 'Snälltåget', '765,-10 785,-10 845,-70 845,-110 905,-170 925,-190 925,-230 845,-310 805,-310', 'night', { stops: ['malmo', 'stockholm', 'storlien'], url: 'https://www.snalltaget.se/tag-till-storlien', note: 'Seasonal, selected dates. Next winter season: 16 December 2026–2 May 2027. Via Östersund and Åre.' }],
  ['malmo', 'innsbruck', 'Snälltåget', '765,-10 745,10 625,10 605,-10 565,30 565,50 605,90 565,130 565,420 685,540 665,560 645,560', 'night', { stops: ['malmo', 'copenhagen', 'hamburg', 'innsbruck'], url: 'https://www.snalltaget.se/en/train-to-austria-winter', note: 'Seasonal: 18 December 2026–14 March 2027. Copenhagen-area stop: Høje Taastrup. Via Zell am See; Stockholm usually requires a connection in Malmö.' }],
  ['brussels', 'prague', 'European Sleeper', '265,250 245,230 245,190 325,110 365,150 405,110 625,110 725,210 765,210 785,230 785,330 765,350', 'night', { stops: ['brussels', 'amsterdam', 'berlin', 'prague'], url: 'https://europeansleeper.eu/timetable', note: 'Three times a week. Berlin stop: Gesundbrunnen. Via Dresden.' }],
  ['paris', 'berlin', 'European Sleeper', '225,390 205,370 205,310 265,250 285,230 405,110 585,110 605,90 625,70 665,70 785,190 765,210', 'night', { stops: ['paris', 'brussels', 'hamburg', 'berlin'], url: 'https://europeansleeper.eu/timetable', note: 'Three times a week. Paris Nord; Hamburg-Harburg; Berlin station varies by direction. The Paris–Brussels section is not itself an overnight journey.' }],
  ['brussels', 'milan', 'European Sleeper', '265,250 285,270 405,270 445,290 465,310 465,410 405,470 405,590 465,650', 'night', { stops: ['brussels', 'cologne', 'milan'], url: 'https://europeansleeper.eu/timetable', note: 'Three times a week. Milan stop: Porta Garibaldi. Via Aarau and the Gotthard route; no Zurich stop in the published October 2026 timetable.' }],
];

function routeStops(route) { return route[5]?.stops || [route[0], route[1]]; }

const svgNS = 'http://www.w3.org/2000/svg';
const map = document.querySelector('#rail-map');
const panel = document.querySelector('#city-details');
const picker = document.querySelector('#city-select');
const filters = { day: document.querySelector('#day-trains'), night: document.querySelector('#night-trains') };
let selected = null;

function svgElement(tag, attributes) {
  const element = document.createElementNS(svgNS, tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

for (const route of routes) {
  const [from, to, operator, points, type = 'day'] = route;
  const line = svgElement('polyline', { points, class: `rail-route ${type}`, 'aria-hidden': 'true' });
  map.append(line);
  route.element = line;
}

for (const [id, city] of Object.entries(cities)) {
  const group = svgElement('g', { class: `station${city.hub ? ' hub' : ''}`, transform: `translate(${city.x} ${city.y})`, role: 'button', tabindex: '0', 'aria-label': `${city.name}, ${city.country}${city.hub ? ', major hub' : ''}`, 'aria-pressed': 'false', 'aria-controls': 'city-details' });
  group.append(svgElement('circle', { r: 23, class: 'hit-area' }));
  if (city.hub) group.append(svgElement('circle', { r: 11, class: 'hub-ring' }));
  group.append(svgElement('circle', { r: city.hub ? 6 : 5, class: 'stop' }));
  const label = svgElement('text', { x: 0, y: -20, 'text-anchor': 'middle' });
  label.textContent = city.name;
  group.append(label);
  group.addEventListener('click', () => selectCity(id));
  group.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCity(id);
    }
  });
  map.append(group);
  city.element = group;
}

for (const [id, city] of Object.entries(cities).sort((a, b) => a[1].name.localeCompare(b[1].name))) {
  picker.add(new Option(city.name, id));
}

function visible(route) { return filters[route[4] || 'day'].checked; }

function selectCity(id) {
  selected = id || null;
  picker.value = id || '';
  for (const [key, city] of Object.entries(cities)) city.element.setAttribute('aria-pressed', String(key === selected));
  for (const route of routes) {
    const connected = routeStops(route).includes(selected);
    route.element.toggleAttribute('hidden', !visible(route));
    route.element.classList.toggle('emphasized', Boolean(selected) && connected);
    route.element.classList.toggle('muted', Boolean(selected) && !connected);
  }
  panel.replaceChildren();
  const heading = document.createElement('h3');
  heading.id = 'city-name';
  heading.textContent = selected ? cities[selected].name : 'Where would you go?';
  panel.append(heading);
  if (!selected) {
    const prompt = document.createElement('p');
    prompt.textContent = 'Select a station on the map, or choose a city below.';
    panel.append(prompt);
    return;
  }
  const city = cities[selected];
  const country = document.createElement('p');
  country.textContent = `${city.country}${city.hub ? ' · Major hub' : ''}`;
  const station = document.createElement('p');
  const stationLabel = document.createElement('strong');
  stationLabel.textContent = 'Main station(s): ';
  station.append(stationLabel, city.station);
  panel.append(country, station);
  for (const [type, title] of [['day', 'Long-distance'], ['night', 'Night trains']]) {
    if (!filters[type].checked) continue;
    const subheading = document.createElement('h4');
    subheading.textContent = title;
    panel.append(subheading);
    const connections = routes.filter(route => (route[4] || 'day') === type && routeStops(route).includes(selected));
    if (!connections.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No connections shown in this selection.';
      panel.append(empty);
      continue;
    }
    const list = document.createElement('ul');
    for (const route of connections) {
      const [, , operator, , , details] = route;
      const item = document.createElement('li');
      const service = document.createElement(details?.url ? 'a' : 'strong');
      service.textContent = operator;
      if (details?.url) service.href = details.url;
      item.append(service, ': ');
      const destinations = routeStops(route).filter(stop => stop !== selected);
      for (const [index, destination] of destinations.entries()) {
        if (index) item.append(' · ');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = cities[destination].name;
        button.addEventListener('click', () => {
          selectCity(destination);
          cities[destination].element.focus({ preventScroll: true });
        });
        item.append(button);
      }
      if (details?.note) {
        const note = document.createElement('small');
        note.textContent = details.note;
        item.append(document.createElement('br'), note);
      }
      list.append(item);
    }
    panel.append(list);
  }
  const note = document.createElement('p');
  note.textContent = city.note;
  const link = document.createElement('a');
  link.href = city.url;
  link.textContent = 'Timetables & tickets ↗';
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.textContent = 'Show full network';
  reset.addEventListener('click', () => {
    selectCity(null);
    city.element.focus();
  });
  const actions = document.createElement('p');
  actions.append(reset);
  panel.append(note, link, actions);
}

picker.addEventListener('change', () => selectCity(picker.value));
for (const filter of Object.values(filters)) filter.addEventListener('change', () => selectCity(selected));
document.querySelector('#network-filters').hidden = false;
document.querySelector('#city-picker').hidden = false;
