import React, { useEffect, useRef, useState } from 'react';
import './SriLankaMap.css';

// City coords calibrated to SL_OUTLINE path (viewBox 0 0 320 420)
const CITY_COORDS = {
  'Colombo':      { x: 82,  y: 220 },
  'Negombo':      { x: 80,  y: 190 },
  'Kandy':        { x: 138, y: 198 },
  'Sigiriya':     { x: 162, y: 158 },
  'Dambulla':     { x: 150, y: 170 },
  'Polonnaruwa':  { x: 194, y: 168 },
  'Anuradhapura': { x: 138, y: 120 },
  'Trincomalee':  { x: 212, y: 115 },
  'Ella':         { x: 174, y: 272 },
  'Nuwara Eliya': { x: 152, y: 250 },
  'Yala':         { x: 198, y: 318 },
  'Mirissa':      { x: 140, y: 355 },
  'Galle':        { x: 102, y: 348 },
  'Unawatuna':    { x: 108, y: 352 },
  'Hikkaduwa':    { x: 92,  y: 336 },
  'Bentota':      { x: 82,  y: 305 },
  'Arugam Bay':   { x: 228, y: 280 },
  'Pinnawala':    { x: 112, y: 212 },
  'Kitulgala':    { x: 118, y: 230 },
  'Adams Peak':   { x: 130, y: 262 },
  'Jaffna':       { x: 148, y: 44  },
  'Batticaloa':   { x: 224, y: 230 },
  'Haputale':     { x: 164, y: 280 },
  'Ratnapura':    { x: 120, y: 274 },
  'Airport':      { x: 78,  y: 198 },
  'BIA':          { x: 78,  y: 198 },
  'Katunayake':   { x: 74,  y: 194 },
  'Minneriya':    { x: 177, y: 164 },
  'Udawalawe':    { x: 160, y: 310 },
  'Wilpattu':     { x: 108, y: 110 },
};

// Accurate Sri Lanka coastline — viewBox 0 0 320 420
// Jaffna peninsula narrows at top, wide central body, east-coast bulge,
// pointed southern tip (Dondra Head), west coast runs straight down left side
const SL_OUTLINE = `
  M 148,24
  C 142,24 136,27 131,33
  C 126,39 122,47 120,56
  C 113,53 106,52 99,56
  C 90,60 83,68 78,78
  C 72,90 70,103 72,116
  C 67,125 63,136 62,148
  C 60,161 62,175 66,187
  C 60,198 57,211 58,224
  C 59,237 65,249 70,260
  C 65,272 63,286 65,300
  C 67,314 73,327 81,338
  C 88,348 96,356 104,364
  C 112,372 120,378 128,384
  C 134,389 140,393 148,395
  C 156,393 162,389 168,384
  C 176,378 184,372 192,364
  C 200,356 208,346 215,335
  C 222,324 227,311 228,298
  C 233,287 236,275 236,263
  C 240,251 242,238 240,226
  C 238,214 233,203 228,194
  C 232,182 234,169 232,157
  C 230,145 224,134 217,125
  C 214,114 212,102 208,92
  C 203,81 196,72 187,66
  C 178,60 168,57 160,56
  C 157,47 153,39 149,33
  C 146,28 148,24 148,24
  Z
`;

function resolveCities(itinerary) {
  if (!itinerary || itinerary.length === 0) return [];
  const found = [];
  const seen = new Set();

  for (const day of itinerary) {
    const text = `${day.title || ''} ${day.activities || ''}`;
    for (const [city, coords] of Object.entries(CITY_COORDS)) {
      if (!seen.has(city) && text.toLowerCase().includes(city.toLowerCase())) {
        found.push({ name: city, ...coords, day: day.day });
        seen.add(city);
      }
    }
  }

  // fallback: show at least 2 cities
  if (found.length < 2) {
    const defaults = ['Colombo', 'Kandy', 'Sigiriya', 'Ella', 'Mirissa'];
    for (const d of defaults) {
      if (!seen.has(d)) {
        found.push({ name: d, ...CITY_COORDS[d], day: found.length + 1 });
        seen.add(d);
        if (found.length >= 4) break;
      }
    }
  }

  return found;
}

export default function SriLankaMap({ itinerary }) {
  const cities = resolveCities(itinerary);
  const [animated, setAnimated] = useState(false);
  const [visibleCities, setVisibleCities] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!animated || cities.length === 0) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCities(i);
      if (i >= cities.length) clearInterval(timer);
    }, 380);
    return () => clearInterval(timer);
  }, [animated, cities.length]);

  if (!itinerary || cities.length === 0) return null;

  const routePoints = cities.map(c => `${c.x},${c.y}`).join(' L ');
  const routePath = cities.length > 1 ? `M ${routePoints}` : '';

  const totalLen = cities.length > 1
    ? cities.slice(1).reduce((acc, c, i) => {
        const prev = cities[i];
        return acc + Math.sqrt((c.x - prev.x) ** 2 + (c.y - prev.y) ** 2);
      }, 0)
    : 0;

  return (
    <div className="sl-map-wrap" ref={ref}>
      <div className="sl-map-label">
        <span className="sl-map-eyebrow">Your Journey</span>
        <h3 className="sl-map-title">Route Through Sri Lanka</h3>
      </div>

      <div className="sl-map-container">
        <svg
          viewBox="0 0 320 420"
          xmlns="http://www.w3.org/2000/svg"
          className="sl-map-svg"
          aria-label="Sri Lanka route map"
        >
          <defs>
            <pattern id="terrain" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(45,106,79,0.06)" strokeWidth="1"/>
            </pattern>
            <filter id="cityglow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Island drop shadow */}
          <path d={SL_OUTLINE} fill="rgba(0,0,0,0.07)" transform="translate(5,6)" />

          {/* Island fill */}
          <path d={SL_OUTLINE} fill="#e8f5ee" stroke="#2d6a4f" strokeWidth="1.8" strokeLinejoin="round" />

          {/* Terrain texture */}
          <path d={SL_OUTLINE} fill="url(#terrain)" />

          {/* Animated route line */}
          {animated && routePath && (
            <path
              d={routePath}
              fill="none"
              stroke="#c9a84c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${totalLen} ${totalLen}`}
              strokeDashoffset={totalLen}
              className="sl-route-line"
            />
          )}

          {/* City dots */}
          {cities.slice(0, visibleCities).map((city, i) => (
            <g key={city.name} className="sl-city-dot" filter="url(#cityglow)">
              <circle cx={city.x} cy={city.y} r="10" fill="rgba(201,168,76,0.2)" className="sl-pulse" />
              <circle
                cx={city.x} cy={city.y} r="5"
                fill={i === 0 ? '#1a4731' : i === cities.length - 1 ? '#c9a84c' : '#2d6a4f'}
                stroke="white" strokeWidth="2"
              />
              <circle cx={city.x + 9} cy={city.y - 9} r="7" fill="#c9a84c" />
              <text x={city.x + 9} y={city.y - 9} textAnchor="middle" dominantBaseline="central"
                fill="#1a1a1a" fontSize="7" fontWeight="700">{city.day}</text>
            </g>
          ))}

          {/* City name labels */}
          {cities.slice(0, visibleCities).map((city) => {
            const labelX = city.x > 200 ? city.x - 6 : city.x + 6;
            const anchor = city.x > 200 ? 'end' : 'start';
            return (
              <text
                key={`label-${city.name}`}
                x={labelX} y={city.y + 1}
                textAnchor={anchor}
                dominantBaseline="central"
                fill="#1a4731"
                fontSize="8.5" fontWeight="600"
                className="sl-city-label"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {city.name}
              </text>
            );
          })}

          {/* Compass rose */}
          <g transform="translate(276, 50)">
            <circle cx="0" cy="0" r="18" fill="white" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.9"/>
            <text x="0" y="-8" textAnchor="middle" fontSize="7" fill="#1a4731" fontWeight="700">N</text>
            <polygon points="0,-13 -3,-2 0,0 3,-2" fill="#1a4731"/>
            <polygon points="0,13 -3,2 0,0 3,2" fill="#aaa"/>
            <text x="0" y="19" textAnchor="middle" fontSize="7" fill="#aaa">S</text>
            <text x="-18" y="3" textAnchor="middle" fontSize="7" fill="#aaa">W</text>
            <text x="18" y="3" textAnchor="middle" fontSize="7" fill="#aaa">E</text>
          </g>

          {/* Ocean label */}
          <g transform="translate(20, 400)">
            <text x="0" y="0" fontSize="7" fill="#999" style={{ fontFamily: 'Inter, sans-serif' }}>🌊 Indian Ocean</text>
          </g>
        </svg>

        {/* City legend */}
        <div className="sl-map-legend">
          {cities.map((city, i) => (
            <div
              key={city.name}
              className={`sl-legend-item ${i < visibleCities ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 380}ms` }}
            >
              <span className="sl-legend-dot" style={{
                background: i === 0 ? '#1a4731' : i === cities.length - 1 ? '#c9a84c' : '#2d6a4f'
              }} />
              <span className="sl-legend-day">Day {city.day}</span>
              <span className="sl-legend-name">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
