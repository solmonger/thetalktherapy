/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Brand Colors - Warm Pastel Palette
      colors: {
        // Primary palette
        peach: {
          50: '#FFF8F5',
          100: '#FFEEE6',
          200: '#FFD8C8',
          300: '#FFC2AA',
          400: '#FFAC8C',
          500: '#FF966E', // Primary brand color
          600: '#E68058',
          700: '#CC6A42',
          800: '#B3542C',
          900: '#993E16',
        },
        sage: {
          50: '#F8FAF8',
          100: '#EFF5EF',
          200: '#C8D8C8',
          300: '#A1BBA1',
          400: '#7A9E7A',
          500: '#538153', // Secondary brand color
          600: '#4A734A',
          700: '#416541',
          800: '#385738',
          900: '#2F492F',
        },
        cream: {
          50: '#FFFEFC',
          100: '#FFFCF8',
          200: '#FFF8F0',
          300: '#FFF4E8',
          400: '#FFF0E0',
          500: '#FFECD8', // Background color
          600: '#E6D4C2',
          700: '#CCBCAC',
          800: '#B3A496',
          900: '#998C80',
        },
        'warm-gray': {
          50: '#FAF9F8',
          100: '#F5F3F1',
          200: '#E8E0D8',
          300: '#DBCDBF',
          400: '#CEBAA6',
          500: '#C1A78D', // Neutral color
          600: '#AD967D',
          700: '#99856D',
          800: '#85745D',
          900: '#71634D',
        },
        
        // Semantic colors
        primary: {
          DEFAULT: '#FFD8C8',
          50: '#FFF8F5',
          100: '#FFEEE6',
          200: '#FFD8C8',
          300: '#FFC2AA',
          400: '#FFAC8C',
          500: '#FF966E',
          600: '#E68058',
          700: '#CC6A42',
          800: '#B3542C',
          900: '#993E16',
        },
        secondary: {
          DEFAULT: '#C8D8C8',
          50: '#F8FAF8',
          100: '#EFF5EF',
          200: '#C8D8C8',
          300: '#A1BBA1',
          400: '#7A9E7A',
          500: '#538153',
          600: '#4A734A',
          700: '#416541',
          800: '#385738',
          900: '#2F492F',
        },
        
        // Functional colors
        success: {
          DEFAULT: '#4CAF50',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        warning: {
          DEFAULT: '#FF9800',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        error: {
          DEFAULT: '#F44336',
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        info: {
          DEFAULT: '#2196F3',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        
        // Text colors
        text: {
          DEFAULT: '#333333',
          light: '#666666',
          lighter: '#999999',
          dark: '#1A1A1A',
        },
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Spacing (8px base system)
      spacing: {
        '3xs': '0.25rem',  // 4px
        '2xs': '0.5rem',   // 8px
        'xs': '0.75rem',   // 12px
        'sm': '1rem',      // 16px
        'md': '1.5rem',    // 24px
        'lg': '2rem',      // 32px
        'xl': '3rem',      // 48px
        '2xl': '4rem',     // 64px
        '3xl': '6rem',     // 96px
      },
      
      // Border Radius
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
      },
      
      // Box Shadow
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'xl': '0 8px 16px rgba(0, 0, 0, 0.16)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      
      // Transition
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  // Safelist for dynamic classes
  safelist: [
    'bg-peach-200',
    'bg-sage-200',
    'bg-cream-200',
    'text-peach-600',
    'text-sage-600',
    'border-peach-300',
    'border-sage-300',
  ],
};