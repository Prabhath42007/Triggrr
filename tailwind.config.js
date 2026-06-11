/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Brand backgrounds ── */
        'bg-primary':   '#0D0D1A',
        'bg-card':      '#12122A',
        'bg-card-hover':'#181836',

        /* ── Purple accent ── */
        purple: {
          DEFAULT: '#7C3AED',
          light:   '#9F67FF',
          dark:    '#5B21B6',
          subtle:  'rgba(124,58,237,0.10)',
          glow:    'rgba(124,58,237,0.30)',
          border:  'rgba(124,58,237,0.40)',
        },

        /* ── Cyan accent ── */
        cyan: {
          DEFAULT: '#06D6F5',
          light:   '#67E8F9',
          dark:    '#0891B2',
          subtle:  'rgba(6,214,245,0.10)',
          glow:    'rgba(6,214,245,0.25)',
        },

        /* ── Text scale ── */
        text: {
          primary: '#FFFFFF',
          muted:   '#94A3B8',
          faint:   '#475569',
        },

        /* ── Borders ── */
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover:   'rgba(255,255,255,0.14)',
          purple:  'rgba(124,58,237,0.40)',
        },

        /* ── WhatsApp ── */
        whatsapp: '#25D366',
      },

      /* ── Typography ── */
      fontFamily: {
        sans:    ['Sora', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      /* ── Fluid font sizes ── */
      fontSize: {
        'display-xl': ['clamp(2.5rem,6vw,4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem,4.5vw,3.25rem)', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem,3.5vw,2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },

      /* ── Spacing extras ── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
      },

      /* ── Border radius ── */
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.25rem',
        'xl4': '1.5rem',
      },

      /* ── Background patterns ── */
      backgroundImage: {
        'dot-grid':   'radial-gradient(circle, rgba(124,58,237,0.18) 1px, transparent 1px)',
        'dot-grid-sm':'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'shimmer':    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
      },
      backgroundSize: {
        'dot':    '28px 28px',
        'dot-sm': '20px 20px',
        '200%':   '200%',
      },

      /* ── Box shadows ── */
      boxShadow: {
        'card':        '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 0 0 1px rgba(124,58,237,0.5), 0 8px 32px rgba(0,0,0,0.5)',
        'purple-glow': '0 0 32px rgba(124,58,237,0.35)',
        'cyan-glow':   '0 0 24px rgba(6,214,245,0.25)',
        'btn':         '0 2px 12px rgba(124,58,237,0.4)',
        'btn-hover':   '0 4px 20px rgba(124,58,237,0.6)',
      },

      /* ── Animations ── */
      animation: {
        'shimmer':      'shimmer 1.6s ease-in-out infinite',
        'fade-up':      'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'float':        'float 4s ease-in-out infinite',
        'pulse-purple': 'pulsePurple 2.5s ease-in-out infinite',
        'slide-right':  'slideRight 0.3s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        pulsePurple: {
          '0%,100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' },
          '50%':     { boxShadow: '0 0 40px rgba(124,58,237,0.6)' },
        },
        slideRight: {
          '0%':   { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
      },

      /* ── Transition timing ── */
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16,1,0.3,1)',
      },

      /* ── Grid ── */
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px,1fr))',
        'auto-fill-sm':   'repeat(auto-fill, minmax(200px,1fr))',
      },
    },
  },
  plugins: [],
}
