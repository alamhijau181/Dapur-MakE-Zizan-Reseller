import React, { useState } from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const DapurMakeZizanLogo: React.FC<LogoProps> = ({
  className = "",
  size = 120,
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [showSvg, setShowSvg] = useState(false);

  const logoSources = [
    "/src/assets/images/logo.png",
    "/src/assets/images/logo.jpg",
    "/logo.png",
    "/src/assets/images/logo.jpeg",
  ];

  const handleImageError = () => {
    if (srcIndex < logoSources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setShowSvg(true);
    }
  };

  if (!showSvg) {
    return (
      <img
        src={logoSources[srcIndex]}
        alt="Dapur Mak'e Zizan Logo"
        onError={handleImageError}
        className={`object-contain rounded-full select-none ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={`select-none ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Drop Shadow for the main circle */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.2" />
        </filter>
        {/* Shadow for 3D Text effects */}
        <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#3F1D0B" floodOpacity="0.45" />
        </filter>
        {/* Shiny radial gradient for the yellow badge background */}
        <radialGradient id="yellowBg" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#FFF7C2" />
          <stop offset="35%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#EAB308" />
        </radialGradient>
        {/* Warm chocolate brown ribbon gradient */}
        <linearGradient id="brownRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5F2F11" />
          <stop offset="50%" stopColor="#451A03" />
          <stop offset="100%" stopColor="#301000" />
        </linearGradient>
      </defs>

      {/* Outer subtle glow */}
      <circle cx="200" cy="200" r="185" fill="none" stroke="#EAB308" strokeWidth="2" opacity="0.25" />

      {/* Main Yellow Circle with shadow */}
      <circle cx="200" cy="200" r="175" fill="url(#yellowBg)" filter="url(#logoShadow)" />

      {/* White Dashed Decorative Circle */}
      <circle cx="200" cy="200" r="158" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeDasharray="8 6" opacity="0.85" />
      <circle cx="200" cy="200" r="151" fill="none" stroke="#EAB308" strokeWidth="1.5" opacity="0.4" />

      {/* Top Sparkles */}
      {/* Sparkle 1 (Top Left) */}
      <path d="M 135 85 L 138 93 L 146 96 L 138 99 L 135 107 L 132 99 L 124 96 L 132 93 Z" fill="#FFFFFF" />
      {/* Sparkle 2 (Top Center-Right) */}
      <path d="M 255 75 L 259 87 L 271 91 L 259 95 L 255 107 L 251 95 L 239 91 L 251 87 Z" fill="#FFFFFF" />
      {/* Sparkle 3 (Slightly lower right) */}
      <path d="M 285 110 L 287 116 L 293 118 L 287 120 L 285 126 L 283 120 L 277 118 L 283 116 Z" fill="#FFFFFF" />

      {/* Splash drops (representing sauce/spicy delicious droplets) */}
      {/* Left side red & orange droplets */}
      <path d="M 85 130 C 85 135 81 138 78 138 C 75 138 73 135 75 130 C 77 125 85 120 85 120 C 85 120 85 125 85 130 Z" fill="#EF4444" transform="rotate(-35, 78, 130)" />
      <circle cx="68" cy="148" r="5" fill="#F59E0B" />
      <circle cx="95" cy="115" r="4.5" fill="#EA580C" />

      {/* Right side red & orange droplets */}
      <path d="M 315 120 C 315 125 319 128 322 128 C 325 128 327 125 325 120 C 323 115 315 110 315 110 C 315 110 315 115 315 120 Z" fill="#EF4444" transform="rotate(35, 322, 120)" />
      <circle cx="332" cy="138" r="5" fill="#F59E0B" />
      <circle cx="310" cy="225" r="4" fill="#22C55E" />

      {/* Left Mint/Basil Leaves (Fresh food vibe) */}
      <g transform="translate(70, 240) rotate(-35)">
        <path d="M 0 0 C 15 -15 35 -10 35 15 C 35 15 15 30 0 0" fill="#166534" />
        <path d="M 0 0 C 10 -20 25 -20 35 15" fill="#22C55E" opacity="0.6" />
        <path d="M 0 0 L 25 5" stroke="#14532D" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(62, 255) rotate(-5)">
        <path d="M 0 0 C 12 -12 28 -8 28 12 C 28 12 12 24 0 0" fill="#15803D" />
        <path d="M 0 0 L 18 4" stroke="#14532D" strokeWidth="1" fill="none" />
      </g>
      <circle cx="75" cy="225" r="4.5" fill="#15803D" opacity="0.8" />

      {/* Right Mint/Basil Leaves */}
      <g transform="translate(330, 240) rotate(35)">
        <path d="M 0 0 C -15 -15 -35 -10 -35 15 C -35 15 -15 30 0 0" fill="#166534" />
        <path d="M 0 0 C -10 -20 -25 -20 -35 15" fill="#22C55E" opacity="0.6" />
        <path d="M 0 0 L -25 5" stroke="#14532D" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(338, 255) rotate(5)">
        <path d="M 0 0 C -12 -12 -28 -8 -28 12 C -28 12 -12 24 0 0" fill="#15803D" />
        <path d="M 0 0 L -18 4" stroke="#14532D" strokeWidth="1" fill="none" />
      </g>
      <circle cx="325" cy="220" r="4" fill="#15803D" opacity="0.8" />

      {/* Curved Text Path definitions for "Dapur Mak'e" */}
      <path id="textArcLogo" d="M 72 178 A 138 138 0 0 1 328 178" fill="none" />

      {/* Playful, 3D Layered text: "Dapur Mak'e" */}
      {/* 1. Behind Chocolate Shadow */}
      <text fontFamily="'Inter', 'Outfit', sans-serif" fontWeight="900" fontSize="34" fill="#451A03" filter="url(#textShadow)" letterSpacing="0.5">
        <textPath href="#textArcLogo" startOffset="50%" textAnchor="middle">
          Dapur Mak'e
        </textPath>
      </text>

      {/* 2. White sticker outline layer */}
      <text fontFamily="'Inter', 'Outfit', sans-serif" fontWeight="900" fontSize="34" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" letterSpacing="0.5">
        <textPath href="#textArcLogo" startOffset="50%" textAnchor="middle">
          Dapur Mak'e
        </textPath>
      </text>

      {/* 3. Main Text color (Playful chocolate red hybrid) */}
      <text fontFamily="'Inter', 'Outfit', sans-serif" fontWeight="900" fontSize="34" fill="#B91C1C" letterSpacing="0.5">
        <textPath href="#textArcLogo" startOffset="50%" textAnchor="middle">
          <tspan fill="#78350F">Dapur</tspan> <tspan fill="#DC2626">Mak'e</tspan>
        </textPath>
      </text>

      {/* Big cursive Text in the center: "Zizan" */}
      <g transform="translate(200, 222)" filter="url(#textShadow)">
        {/* White outline for sticker effect */}
        <text x="0" y="0" fontFamily="'Playfair Display', 'Outfit', 'Inter', serif" fontWeight="900" fontStyle="italic" fontSize="54" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round" textAnchor="middle">
          Zizan
        </text>
        {/* Main deep green text */}
        <text x="0" y="0" fontFamily="'Playfair Display', 'Outfit', 'Inter', serif" fontWeight="900" fontStyle="italic" fontSize="54" fill="#15803D" textAnchor="middle">
          Zizan
        </text>

        {/* Dynamic Underline swoosh for Zizan */}
        <path d="M -75 14 Q 0 25 75 10 Q 45 14 -45 16 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        <path d="M -75 14 Q 0 25 75 10 Q 45 14 -45 16 Z" fill="#15803D" />
      </g>

      {/* Crossed Spoon & Fork in the bottom-middle */}
      <g transform="translate(200, 275)">
        {/* Left-crossed Fork (Wooden brown) */}
        <g transform="rotate(-20) translate(-32, 0)" fill="#78350F">
          {/* Fork head & slots */}
          <path d="M -10 -22 C -15 -22 -15 -10 -15 0 C -15 4 -10 8 -5 8 L -5 32 C -5 34 -2 36 0 36 C 2 36 5 34 5 32 L 5 8 C 10 8 15 4 15 0 C 15 -10 15 -22 10 -22 C 8 -22 7 -14 7 -4 L 5 -4 L 5 -22 L 0 -24 L -5 -22 L -5 -4 L -7 -4 C -7 -14 -8 -22 -10 -22 Z" />
        </g>
        
        {/* Right-crossed Spoon (Wooden brown) */}
        <g transform="rotate(20) translate(32, 0)" fill="#78350F">
          {/* Spoon bowl */}
          <path d="M -12 -22 C -18 -13 -18 4 -5 8 L -5 32 C -5 34 -2 36 0 36 C 2 36 5 34 5 32 L 5 8 C 18 4 18 -13 12 -22 C 6 -28 -6 -28 -12 -22 Z" />
        </g>

        {/* Cute small Red Heart in the exact middle of the crossed fork & spoon */}
        <g transform="translate(0, 4) scale(0.95)" fill="#EF4444" filter="url(#textShadow)">
          <path d="M 12 -12 C 8 -16 2 -16 -2 -12 L -6 -8 L -10 -12 C -14 -16 -20 -16 -24 -12 C -28 -8 -28 -2 -24 2 L -6 20 L 12 2 Z" />
        </g>
      </g>

      {/* Banner Ribbon at the very bottom */}
      <g transform="translate(200, 342)" filter="url(#logoShadow)">
        {/* Left ribbon tail */}
        <path d="M -150 14 L -170 28 L -162 4 L -150 14 Z" fill="#451A03" />
        {/* Right ribbon tail */}
        <path d="M 150 14 L 170 28 L 162 4 L 150 14 Z" fill="#451A03" />
        
        {/* Ribbon folds */}
        <path d="M -145 14 L -125 0 L -125 14 Z" fill="#301000" />
        <path d="M 145 14 L 125 0 L 125 14 Z" fill="#301000" />

        {/* Main Ribbon banner body */}
        <path d="M -132 0 L 132 0 C 146 0 146 22 132 22 L -132 22 C -146 22 -146 0 -132 0 Z" fill="url(#brownRibbon)" stroke="#EAB308" strokeWidth="1.2" />
        
        {/* White elegant tag text on ribbon */}
        <text x="0" y="14" fontFamily="'Inter', 'Outfit', sans-serif" fontWeight="900" fontSize="10.5" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.8">
          • MASAKAN ENAK, RASA JUARA! •
        </text>
      </g>
    </svg>
  );
};
