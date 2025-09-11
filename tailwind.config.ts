import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Neon Color System - Exact from user palette */
        neon: {
          purple: 'hsl(270, 100%, 50%)',    /* #7E00FF */
          cyan: 'hsl(193, 100%, 50%)',      /* #00C7FF */
          mint: 'hsl(167, 100%, 78%)',      /* #00FFC8 */
          lime: 'hsl(113, 100%, 50%)',      /* #1CFF00 */
          yellow: 'hsl(66, 100%, 50%)',     /* #DCFF00 */
          orange: 'hsl(19, 100%, 50%)',     /* #FF5100 */
        },
        /* Level-based Color System */
        level: {
          'advanced': 'hsl(270, 100%, 50%)',     /* #7E00FF - Purple */
          'analysis': 'hsl(193, 100%, 50%)',     /* #00C7FF - Cyan */
          'creativity': 'hsl(167, 100%, 78%)',   /* #00FFC8 - Mint */
          'strategy': 'hsl(113, 100%, 50%)',     /* #1CFF00 - Lime */
          'psychology': 'hsl(66, 100%, 50%)',    /* #DCFF00 - Yellow */
        },
        /* Glass Effects */
        'glass': 'hsl(var(--bg-glass) / 0.6)',
        'glass-border': 'hsl(var(--border-glass) / 0.2)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'display': ['Helvetica Neue', 'Inter Tight', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'condensed': ['Inter Tight', 'Helvetica Neue', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'number-xs': ['0.5rem', { lineHeight: '0.6rem' }],      // Tiny # symbol
        'number-massive': ['5rem', { lineHeight: '0.85' }],     // Ultra-thin massive numbers
        'score-lg': ['2.5rem', { lineHeight: '1' }],            // Large score numbers
        'title-lg': ['1.75rem', { lineHeight: '1.2' }],         // Card titles
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'ultra-thin': '100',
        'thin': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-score': 'var(--gradient-score)',
      },
      boxShadow: {
        'brand': 'var(--shadow-brand)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.02)",
          },
        },
        "slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
