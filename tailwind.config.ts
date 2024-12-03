import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    colors: {
      ...colors,
      red: '#EB4141',
      blue: '#198DF7',

      backgrounds: {
        darkest: '#1C1D21',
        default: '#212227',
        light: '#3A3E47',
        sub: '#292C33',
        blue: '#0772D4',
      },

      text: {
        main: '#EDEDED',
        light: '#999999',
        sub: '#C2C2C2',
        placeholder: '#777777',
        error: '#EB4141',
        accent: '#EB4141',
      },

      borders: {
        main: '#555555',
        sub: '#292C33',
      },
    },
    fontSize: {
      xxs: '8px',
      xs: '12px',
      s: '13px',
      sm: '14px',
      md: '15px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '31px',
      '4xl': '38px',
      '5xl': '48px',
    },
    boxShadow: {
      main: '2px 2px 8px 0px #00000033',
      'custom-light': '0 10px 20px rgba(0, 0, 0, 0.25), 0 6px 10px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      '6': '6px',
      '16': '16px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2.0px',
      1: '4.0px',
      1.5: '6.0px',
      2: '8.0px',
      2.5: '10.0px',
      3: '12.0px',
      3.5: '14.0px',
      4: '16.0px',
      5: '20.0px',
      6: '24.0px',
      7: '28.0px',
      7.5: '30.0px',
      8: '32.0px',
      9: '36.0px',
      10: '40.0px',
      11: '44.0px',
      12: '48.0px',
      12.5: '50.0px',
      13: '52.0px',
      14: '56.0px',
      15: '60px',
      16: '64.0px',
      20: '80.0px',
      24: '96.0px',
      25: '100.0px',
      28: '112.0px',
      32: '128.0px',
      36: '144.0px',
      40: '160.0px',
      44: '176.0px',
      48: '192.0px',
      52: '208.0px',
      56: '224.0px',
      60: '240.0px',
      64: '256.0px',
      72: '288.0px',
      80: '320.0px',
      96: '384.0px',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
