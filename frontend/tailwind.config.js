/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed-dim": "#00dbe9",
        "on-secondary-fixed": "#410004",
        "inverse-on-surface": "#303036",
        "error": "#ffb4ab",
        "on-background": "#e4e1e9",
        "surface-bright": "#39383e",
        "outline": "#849495",
        "on-tertiary": "#520070",
        "surface-tint": "#00dbe9",
        "on-error-container": "#ffdad6",
        "on-surface-variant": "#b9cacb",
        "background": "#131318",
        "surface-container-high": "#2a292f",
        "primary-container": "#00f0ff",
        "on-tertiary-fixed": "#320046",
        "surface-container-lowest": "#0e0e13",
        "surface-container": "#1f1f25",
        "surface-container-highest": "#35343a",
        "surface-variant": "#35343a",
        "surface-container-low": "#1b1b20",
        "on-primary-fixed": "#002022",
        "tertiary-container": "#f5cbff",
        "on-primary": "#00363a",
        "secondary": "#ffb3ae",
        "on-surface": "#e4e1e9",
        "on-primary-fixed-variant": "#004f54",
        "tertiary-fixed-dim": "#edb1ff",
        "primary-fixed": "#7df4ff",
        "on-primary-container": "#006970",
        "inverse-surface": "#e4e1e9",
        "on-tertiary-container": "#883ca6",
        "surface-dim": "#131318",
        "on-error": "#690005",
        "secondary-fixed-dim": "#ffb3ae",
        "inverse-primary": "#006970",
        "error-container": "#93000a",
        "tertiary": "#fff2fd",
        "on-secondary": "#68000b",
        "primary": "#dbfcff",
        "secondary-container": "#a90219",
        "surface": "#131318",
        "on-secondary-fixed-variant": "#930014",
        "secondary-fixed": "#ffdad7",
        "outline-variant": "#3b494b",
        "tertiary-fixed": "#f9d8ff",
        "on-secondary-container": "#ffb3ad",
        "on-tertiary-fixed-variant": "#6e208c"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-max": "1280px",
        "stack-lg": "32px",
        "section-gap": "80px",
        "margin-edge": "32px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "gutter": "24px"
      },
      fontFamily: {
        "display-lg": ["Sora", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "display-lg-mobile": ["Sora", "sans-serif"],
        "headline-md": ["Sora", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "data-mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "fontWeight": "700"}],
        "display-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "800"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "data-mono": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}]
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
