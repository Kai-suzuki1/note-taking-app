/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto']
    },
    placeholderColor: {
      gray: '##cbd5e1'
    },
    extend: {
      dropShadow: '1px 1px 3px rgba(104, 103, 103, 0.8)',
      spacing: {
        4.5: '1.125rem', // 18px
        18: '4.75rem', // 76px
        26: '6.375rem', // 102px
        31: '7.75rem', // 124px
        41: '10.375rem', // 166px
        130: '32.25rem' // 520px
      },
      fontSize: {
        xs: '0.625rem', // 10px
        sm: '0.75rem', // 12px
        base: '0.875rem', // 14px
        lg: '1rem', // 16px
        xl: '1.125rem' // 18px
      },
      colors: {
        red: '#DC2626',
        gray: {
          light: '#FFFFFF',
          DEFAULT: '#F1F1F1',
          dark: '#D6D6D6'
        },
        blue: {
          light: '#96CBFF',
          DEFAULT: '#3A9EFF',
          dark: '#3B5F82'
        },
        pink: {
          light: '#FFABD3',
          DEFAULT: '#FF69B1',
          dark: '#D80068'
        },
        purple: {
          light: '#8B99F6',
          DEFAULT: '#6579FC',
          dark: '#4858C0'
        },
        yellow: {
          light: '#E8DE53',
          DEFAULT: '#B4A406',
          dark: '#B4A406'
        },
        current: 'currentColor',
        transparent: 'transparent'
      },
      animation: {
        'color-change-2x': 'color-change-2x 4s linear  infinite alternate both',
        'text-pop-up-top': 'text-pop-up-top 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'jello-horizontal': 'jello-horizontal 0.7s ease both'
      },
      keyframes: {
        'color-change-2x': {
          '0%': {
            background: '#FFFFFF'
          },
          to: {
            background: '#8B99F6'
          }
        },
        'text-pop-up-top': {
          '0%': {
            transform: 'translateY(0)',
            'transform-origin': '50% 50%',
            'text-shadow': 'none'
          },
          to: {
            transform: 'translateY(-50px)',
            'transform-origin': '50% 50%',
            'text-shadow':
              '0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc, 0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc, 0 50px 30px rgba(0, 0, 0, .3)'
          }
        },
        'jello-horizontal': {
          '0%,to': {
            transform: 'scale3d(1, 1, 1)'
          },
          '30%': {
            transform: 'scale3d(1.25, .75, 1)'
          },
          '40%': {
            transform: 'scale3d(.75, 1.25, 1)'
          },
          '50%': {
            transform: 'scale3d(1.15, .85, 1)'
          },
          '65%': {
            transform: 'scale3d(.95, 1.05, 1)'
          },
          '75%': {
            transform: 'scale3d(1.05, .95, 1)'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
