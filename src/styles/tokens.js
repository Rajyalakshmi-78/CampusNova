/**
 * CampusNova Design System Tokens
 * Version: 1.0.0-PROD
 * Visual Identity: Biophilic Smart Campus / Digital Twin
 */

export const BRAND_COLORS = {
  forest: "#12372A",    // Deep Forest: Major branding, navigation, dark structural surfaces
  emerald: "#1F8A5B",   // Emerald: Main CampusNova brand color, primary actions, links
  fresh: "#4CAF73",     // Fresh Green: Hover states, walking routes, positive telemetry
  gold: "#E7B84B",      // Warm Gold: Featured highlights, landmarks, notifications
  ivory: "#F7F4ED",     // Ivory: Primary light background canvas
  charcoal: "#18201C",  // Charcoal: Dark mode base surfaces, headings, high-contrast text
  slate: "#5D6962",     // Slate: Secondary body text, descriptions, coordinate legends
  sage: "#E5EFE8",      // Soft Sage: Cards, background sections, soft status fills
};

export const STATUS_COLORS = {
  success: "#4F9D69",   // Meadow Jade: Nominal sensor states, open facilities
  info: "#6B8F71",      // Laurel Sage: Standard operational notices, study spots
  warning: "#D99A32",   // Amber Ochre: High room density, scheduled drills
  critical: "#C94A3A",  // Terracotta Carmine: Hazard perimeters, closures
};

export const MAP_COLORS = {
  normalBuilding: "#D9DDD8",      // Standard limestone campus geometries
  selectedBuilding: "#1F8A5B",    // Emerald active inspection volume
  highlightedDestination: "#E7B84B", // Warm Gold landmark beacon
  walkingRoute: "#4CAF73",        // Fresh Green pedestrian path
  restrictedArea: "#C96A4A",      // Terracotta hazard perimeter
  importantLocation: "#E7B84B",   // Warm Gold landmark accent
};

export const THEME_SURFACES = {
  light: {
    background: "#F7F4ED",
    cards: "#FFFFFF",
    secondarySurfaces: "#EEF3EE",
    primaryText: "#18201C",
    secondaryText: "#5D6962",
    borders: "#D9E1DB",
    primaryAction: "#1F8A5B",
    primaryActionHover: "#19724B",
    subtleGlass: "rgba(247, 244, 237, 0.85)",
  },
  dark: {
    background: "#0D1511",
    cards: "#152019",
    secondarySurfaces: "#1C2921",
    primaryText: "#F5F3EA",
    secondaryText: "#AEB9B1",
    borders: "#2D3A32",
    primaryAction: "#3FAE75",
    primaryActionHover: "#4CAF73",
    subtleGlass: "rgba(21, 32, 25, 0.85)",
  },
};

export const THREE_D_PALETTE = {
  buildings: {
    ivory: "#F7F4ED",
    concrete: "#D9DDD8",
    warmStone: "#EBE4D5",
    charcoalAccent: "#18201C",
  },
  roofs: {
    deepForest: "#12372A",
    charcoal: "#18201C",
    darkBronze: "#2B2620",
  },
  roads: {
    graphite: "#323B36",
    warmGray: "#616A65",
  },
  vegetation: {
    forestGreen: "#275239",
    mossGreen: "#356B4B",
    canopyLeaf: "#2D5D42",
  },
  water: {
    mutedTeal: "#204B46",
  },
  landmarks: {
    emerald: "#1F8A5B",
    warmGold: "#E7B84B",
  },
};

export const UI_SPECS = {
  cardRadius: "16px",
  hudRadius: "18px",
  buttonRadius: "10px",
  borderWidth: "1px",
  fontFamilyDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
  fontFamilyMono: "'Space Mono', monospace",
};
