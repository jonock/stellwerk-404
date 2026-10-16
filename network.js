// Curated corridors, not a timetable. Coordinates intentionally simplify geography.
const cities = {
  london: { name: 'London', country: 'United Kingdom', station: 'St Pancras International', x: 85, y: 250, note: 'Allow time for Eurostar check-in, security and border checks.', url: 'https://www.eurostar.com/' },
  paris: { name: 'Paris', country: 'France', station: 'Gare du Nord · Gare de Lyon · Gare de l’Est', x: 225, y: 390, hub: true, note: 'Connections across Paris may require a change of station. Leave time for the transfer.', url: 'https://www.sncf-connect.com/en-en/' },
  brussels: { name: 'Brussels', country: 'Belgium', station: 'Bruxelles-Midi / Brussel-Zuid', x: 265, y: 250, note: 'Midi and Zuid are the French and Dutch names for the same station.', url: 'https://www.b-europe.com/EN' },
  amsterdam: { name: 'Amsterdam', country: 'Netherlands', station: 'Amsterdam Centraal', x: 365, y: 150, note: 'An international gateway for Eurostar, ICE and overnight travel.', url: 'https://www.nsinternational.com/en' },
  cologne: { name: 'Cologne', country: 'Germany', station: 'Köln Hbf', x: 445, y: 290, note: 'The main station is right beside the cathedral.', url: 'https://www.bahn.com/en' },
  frankfurt: { name: 'Frankfurt', country: 'Germany', station: 'Frankfurt (Main) Hbf', x: 525, y: 370, hub: true, note: 'The central station and Frankfurt Airport’s long-distance station are separate stops.', url: 'https://www.bahn.com/en' },
  hamburg: { name: 'Hamburg', country: 'Germany', station: 'Hamburg Hbf', x: 605, y: 90, note: 'A gateway between northern Germany and Scandinavia.', url: 'https://www.bahn.com/en' },
  berlin: { name: 'Berlin', country: 'Germany', station: 'Berlin Hbf', x: 765, y: 210, hub: true, note: 'The main station has platforms on multiple levels. Check your departure level.', url: 'https://www.bahn.com/en' },
  warsaw: { name: 'Warsaw', country: 'Poland', station: 'Warszawa Centralna · Warszawa Wschodnia', x: 955, y: 210, note: 'Check the Warsaw station shown on your ticket; international services can use different stops.', url: 'https://www.intercity.pl/en/' },
  prague: { name: 'Prague', country: 'Czechia', station: 'Praha hlavní nádraží', x: 765, y: 350, note: 'The main station is a short walk from the city centre.', url: 'https://www.cd.cz/en/' },
  zurich: { name: 'Zurich', country: 'Switzerland', station: 'Zürich HB', x: 465, y: 510, hub: true, note: 'A compact interchange for routes through Switzerland and across the Alps.', url: 'https://www.sbb.ch/en' },
  munich: { name: 'Munich', country: 'Germany', station: 'München Hbf', x: 645, y: 470, note: 'A key interchange for Bavaria, Austria and Italy.', url: 'https://www.bahn.com/en' },
  vienna: { name: 'Vienna', country: 'Austria', station: 'Wien Hbf', x: 845, y: 470, hub: true, note: 'A major Nightjet hub. Reserve a couchette or sleeper when booking overnight travel.', url: 'https://www.oebb.at/en/' },
  budapest: { name: 'Budapest', country: 'Hungary', station: 'Budapest-Keleti · Budapest-Kelenföld', x: 955, y: 580, note: 'Check your arrival station: Budapest has several long-distance terminals.', url: 'https://www.mavcsoport.hu/en' },
  lyon: { name: 'Lyon', country: 'France', station: 'Lyon Part-Dieu', x: 285, y: 510, note: 'Part-Dieu is the main interchange for the routes shown here.', url: 'https://www.sncf-connect.com/en-en/' },
  barcelona: { name: 'Barcelona', country: 'Spain', station: 'Barcelona Sants', x: 145, y: 650, note: 'Check reservation requirements for international high-speed services.', url: 'https://www.renfe.com/es/en' },
  milan: { name: 'Milan', country: 'Italy', station: 'Milano Centrale', x: 465, y: 650, note: 'Connect here for Italian high-speed services and routes across the Swiss border.', url: 'https://www.trenitalia.com/en.html' },
  venice: { name: 'Venice', country: 'Italy', station: 'Venezia Santa Lucia', x: 645, y: 610, note: 'Santa Lucia is on the island; Venezia Mestre is on the mainland.', url: 'https://www.trenitalia.com/en.html' },
  rome: { name: 'Rome', country: 'Italy', station: 'Roma Termini', x: 765, y: 670, note: 'Check your ticket: some long-distance services also use Roma Tiburtina.', url: 'https://www.trenitalia.com/en.html' },
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
  ['paris', 'zurich', 'TGV Lyria', '225,390 345,510 465,510'],
  ['paris', 'lyon', 'TGV', '225,390 225,450 285,510'],
  ['lyon', 'barcelona', 'AVE', '285,510 145,650'],
  ['zurich', 'milan', 'EuroCity', '465,510 465,650'],
  ['zurich', 'munich', 'EuroCity', '465,510 605,510 645,470'],
  ['munich', 'vienna', 'Railjet', '645,470 845,470'],
  ['vienna', 'budapest', 'Railjet / EuroCity', '845,470 955,580'],
  ['milan', 'venice', 'Frecciarossa', '465,650 605,650 645,610'],
  ['milan', 'rome', 'Frecciarossa / Italo', '465,650 505,690 745,690 765,670'],
  ['venice', 'rome', 'Frecciarossa / Italo', '645,610 705,610 765,670'],
  ['amsterdam', 'zurich', 'Nightjet', '365,150 335,180 335,300 435,400 435,480 465,510', 'night'],
  ['hamburg', 'zurich', 'Nightjet', '605,90 495,200 495,440 445,490 465,510', 'night'],
  ['berlin', 'zurich', 'Nightjet', '765,210 735,240 735,400 605,530 485,530 465,510', 'night'],
  ['zurich', 'vienna', 'Nightjet', '465,510 505,550 765,550 845,470', 'night'],
  ['vienna', 'rome', 'Nightjet', '845,470 875,500 875,560 765,670', 'night'],
];

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
    const connected = route[0] === selected || route[1] === selected;
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
    const connections = routes.filter(route => (route[4] || 'day') === type && (route[0] === selected || route[1] === selected));
    if (!connections.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No connections shown in this selection.';
      panel.append(empty);
      continue;
    }
    const list = document.createElement('ul');
    for (const [from, to, operator] of connections) {
      const destination = from === selected ? to : from;
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = cities[destination].name;
      button.addEventListener('click', () => {
        selectCity(destination);
        cities[destination].element.focus({ preventScroll: true });
      });
      item.append(button, ` · ${operator}`);
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
