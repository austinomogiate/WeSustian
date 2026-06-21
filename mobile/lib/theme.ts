// Central design tokens for the app. Mirrors the cyan "brand" palette used by
// the existing We Sustain web app so mobile + web feel like one product.

export const colors = {
  // Brand (green) — matches the "We Sustain" leaf logo + the web tailwind config
  brand50: "#f0fdf4",
  brand100: "#dcfce7",
  brand200: "#bbf7d0",
  brand300: "#86efac",
  brand500: "#22c55e",
  brand600: "#16a34a",
  brand700: "#15803d",
  brand800: "#166534",

  // Accent used for gamification / rewards
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  amber100: "#fef3c7",

  // Supportive cause colors
  green100: "#dcfce7",
  green700: "#15803d",
  rose100: "#ffe4e6",
  rose700: "#be123c",
  violet100: "#ede9fe",
  violet700: "#6d28d9",
  blue100: "#dbeafe",
  blue700: "#1d4ed8",

  // Neutrals (slate)
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",

  white: "#ffffff",
  black: "#000000",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadow = {
  card: {
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
};

export const font = {
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
};
