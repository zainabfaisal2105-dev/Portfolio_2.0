import React from 'react';

// Generates an intricate, dense starry canvas matching the user's inspiration:
// 1. Scattered 5-point foil/glitter stars (solid silver, white, dusty blue, dark navy).
// 2. Large hollow 5-point stippled/outlined stars.
// 3. Multi-point starlight cross sparkles & shooting star trails.
// 4. Subtle atmospheric twinkling.

export const StarryInspoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050814]">
      {/* Smoky dark navy nebula / texture gradient */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 30%, #152238 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 80% 70%, #182848 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 50% 90%, #0d192e 0%, transparent 70%)
          `
        }}
      />

      {/* Repeating SVG Pattern for dense background constellation */}
      <svg className="absolute inset-0 w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="myspace-stars-pattern" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* --- Hollow 5-point Stars (Inspo 2) --- */}
            {/* Big Hollow Star 1 */}
            <polygon
              points="80,25 97,78 152,78 108,110 125,162 80,130 35,162 52,110 8,78 63,78"
              fill="none"
              stroke="#8ea2c9"
              strokeWidth="2.5"
              strokeDasharray="2,2"
              className="big-star-1 opacity-75"
              transform="rotate(12, 80, 90)"
            />

            {/* Big Hollow Star 2 */}
            <polygon
              points="320,200 334,242 378,242 342,268 356,310 320,284 284,310 298,268 262,242 306,242"
              fill="none"
              stroke="#b5c6e8"
              strokeWidth="2"
              strokeDasharray="3,1.5"
              className="big-star-2 opacity-80"
              transform="rotate(-15, 320, 255)"
            />

            {/* Medium Hollow Star 3 */}
            <polygon
              points="200,60 210,90 242,90 216,110 226,140 200,122 174,140 184,110 158,90 190,90"
              fill="none"
              stroke="#eef1f7"
              strokeWidth="1.5"
              strokeDasharray="2,1"
              className="big-star-3 opacity-85"
              transform="rotate(25, 200, 100)"
            />

            {/* --- 8-Point Starlight Cross Sparkles (Inspo 2) --- */}
            <g transform="translate(330, 70)" className="big-star-1">
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#8ea2c9" strokeWidth="2" strokeLinecap="round" />
              <line x1="-30" y1="0" x2="30" y2="0" stroke="#8ea2c9" strokeWidth="2" strokeLinecap="round" />
              <line x1="-15" y1="-15" x2="15" y2="15" stroke="#8ea2c9" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="15" y1="-15" x2="-15" y2="15" stroke="#8ea2c9" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
            </g>

            <g transform="translate(60, 310)" className="big-star-3">
              <line x1="0" y1="-22" x2="0" y2="22" stroke="#b5c6e8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#b5c6e8" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="-11" y1="-11" x2="11" y2="11" stroke="#b5c6e8" strokeWidth="1" strokeLinecap="round" />
              <line x1="11" y1="-11" x2="-11" y2="11" stroke="#b5c6e8" strokeWidth="1" strokeLinecap="round" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>

            <g transform="translate(240, 340)" className="big-star-2">
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="2" fill="#ffffff" />
            </g>

            {/* --- Dense Solid Foil 5-Point Stars (Inspo 1) --- */}
            {/* Bright Solid Stars */}
            <polygon points="120,220 125,235 140,235 128,244 132,258 120,250 108,258 112,244 100,235 115,235" fill="#ffffff" className="big-star-2" transform="rotate(-8, 120, 240)" />
            <polygon points="40,190 44,202 56,202 46,210 50,222 40,215 30,222 34,210 24,202 36,202" fill="#8ea2c9" className="big-star-1" transform="rotate(18, 40, 206)" />
            <polygon points="280,110 284,122 296,122 286,130 290,142 280,135 270,142 274,130 264,122 276,122" fill="#ffffff" className="big-star-3" transform="rotate(-22, 280, 126)" />
            <polygon points="210,230 213,240 223,240 215,246 218,256 210,250 202,256 205,246 197,240 207,240" fill="#eef1f7" className="big-star-2" transform="rotate(35, 210, 243)" />
            <polygon points="360,330 363,338 372,338 365,343 368,351 360,346 352,351 355,343 348,338 357,338" fill="#8ea2c9" className="big-star-1" transform="rotate(10, 360, 340)" />
            <polygon points="160,320 163,328 172,328 165,333 168,341 160,336 152,341 155,333 148,328 157,328" fill="#ffffff" className="big-star-3" transform="rotate(-15, 160, 330)" />
            <polygon points="20,70 23,78 32,78 25,83 28,91 20,86 12,91 15,83 8,78 17,78" fill="#8ea2c9" className="big-star-2" transform="rotate(40, 20, 80)" />
            <polygon points="370,140 373,148 382,148 375,153 378,161 370,156 362,161 365,153 358,148 367,148" fill="#eef1f7" className="big-star-1" transform="rotate(-30, 370, 150)" />
            
            {/* Deep Navy/Shadow Metallic Stars (creates layered foil depth like Inspo 1) */}
            <polygon points="100,160 104,172 116,172 106,180 110,192 100,185 90,192 94,180 84,172 96,172" fill="#0d172a" stroke="#253556" strokeWidth="1" transform="rotate(15, 100, 176)" />
            <polygon points="260,170 264,180 274,180 266,186 269,196 260,190 251,196 254,186 246,180 256,180" fill="#0d172a" stroke="#253556" strokeWidth="1" transform="rotate(-25, 260, 183)" />
            <polygon points="170,180 173,188 182,188 175,193 178,201 170,196 162,201 165,193 158,188 167,188" fill="#0b1324" stroke="#1f2d4a" strokeWidth="1" transform="rotate(5, 170, 190)" />
            <polygon points="310,290 313,298 322,298 315,303 318,311 310,306 302,311 305,303 298,298 307,298" fill="#0b1324" stroke="#1f2d4a" strokeWidth="1" transform="rotate(45, 310, 300)" />
            <polygon points="50,260 53,268 62,268 55,273 58,281 50,276 42,281 45,273 38,268 47,268" fill="#0d172a" stroke="#253556" strokeWidth="1" transform="rotate(-40, 50, 270)" />

            {/* Tiny Glitter Stardust */}
            <circle cx="150" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="290" cy="40" r="2" fill="#8ea2c9" />
            <circle cx="70" cy="220" r="1.5" fill="#eef1f7" />
            <circle cx="230" cy="290" r="2" fill="#ffffff" />
            <circle cx="180" cy="270" r="1.5" fill="#8ea2c9" />
            <circle cx="340" cy="180" r="2" fill="#ffffff" />
            <circle cx="110" cy="360" r="1.5" fill="#eef1f7" />
            <circle cx="20" cy="350" r="2" fill="#8ea2c9" />
            <circle cx="385" cy="260" r="1.5" fill="#ffffff" />
            <circle cx="250" cy="15" r="2" fill="#ffffff" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#myspace-stars-pattern)" />
      </svg>

      {/* Floating Accent Big Stars on Viewport Margins (Inspo 2 large outlined & stippled stars) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-Left Grand Hollow Stippled Star */}
        <div className="absolute top-6 left-6 text-[#8ea2c9] opacity-85 big-star-1">
          <svg width="84" height="84" viewBox="0 0 100 100">
            <polygon
              points="50,5 63,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 37,38"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="4,2"
              className="drop-shadow-[0_0_12px_rgba(142,162,201,0.7)]"
            />
            {/* Inner smaller star */}
            <polygon
              points="50,22 58,42 80,42 62,55 69,76 50,63 31,76 38,55 20,42 42,42"
              fill="#8ea2c9"
              fillOpacity="0.25"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Top-Right Starlight Cross Flare */}
        <div className="absolute top-10 right-8 text-white opacity-90 big-star-2">
          <svg width="76" height="76" viewBox="0 0 80 80">
            <line x1="40" y1="0" x2="40" y2="80" stroke="#b5c6e8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="40" x2="80" y2="40" stroke="#b5c6e8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="12" x2="68" y2="68" stroke="#8ea2c9" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="12" x2="12" y2="68" stroke="#8ea2c9" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="5" fill="#ffffff" className="drop-shadow-[0_0_10px_#ffffff]" />
          </svg>
        </div>

        {/* Mid-Left Big Solid & Outline Double Star */}
        <div className="absolute top-[42%] left-3 text-[#b5c6e8] opacity-80 big-star-3">
          <svg width="70" height="70" viewBox="0 0 100 100">
            <polygon
              points="50,5 63,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 37,38"
              fill="none"
              stroke="#8ea2c9"
              strokeWidth="3"
              strokeDasharray="3,3"
            />
            <polygon
              points="50,18 59,40 82,40 64,54 71,76 50,62 29,76 36,54 18,40 41,40"
              fill="#ffffff"
              className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            />
          </svg>
        </div>

        {/* Mid-Right Giant Stippled Star (Inspo 2) */}
        <div className="absolute top-[48%] right-4 text-[#8ea2c9] opacity-85 big-star-1">
          <svg width="90" height="90" viewBox="0 0 100 100">
            <polygon
              points="50,5 63,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 37,38"
              fill="none"
              stroke="#b5c6e8"
              strokeWidth="4"
              strokeDasharray="4,2.5"
              className="drop-shadow-[0_0_14px_rgba(181,198,232,0.8)]"
              transform="rotate(18, 50, 50)"
            />
          </svg>
        </div>

        {/* Bottom-Left Starlight Cross */}
        <div className="absolute bottom-16 left-8 text-white opacity-85 big-star-2">
          <svg width="64" height="64" viewBox="0 0 80 80">
            <line x1="40" y1="4" x2="40" y2="76" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="15" x2="65" y2="65" stroke="#8ea2c9" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="65" y1="15" x2="15" y2="65" stroke="#8ea2c9" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="4" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom-Right Big Double Outline Star */}
        <div className="absolute bottom-12 right-6 text-[#8ea2c9] opacity-85 big-star-3">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <polygon
              points="50,5 63,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 37,38"
              fill="none"
              stroke="#eef1f7"
              strokeWidth="3"
              strokeDasharray="3,2"
              transform="rotate(-12, 50, 50)"
            />
            <polygon
              points="50,22 58,42 80,42 62,55 69,76 50,63 31,76 38,55 20,42 42,42"
              fill="#8ea2c9"
              fillOpacity="0.4"
              stroke="#ffffff"
              strokeWidth="1.5"
              transform="rotate(-12, 50, 50)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
