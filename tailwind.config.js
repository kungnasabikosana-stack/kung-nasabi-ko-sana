/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          'powder-blue': '#BFD7EA',
          'dusty-blue': '#8FAEC9',
          'pale-steel': '#AFC4D5',
          'sky-blue': '#DCEAF5',
          'faded-navy': '#5E728A',
          'blue-gray': '#8798A8',
          'cream': '#FBF8F3',
          'ivory': '#FFFEF7',
          'paper-beige': '#F5F1E8',
          'silver': '#E8E6E0',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'elegant': ['Cormorant Garamond', 'serif'],
        'handwrite': ['Dancing Script', 'cursive'],
        'cursive': ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22/><feColorMatrix in=%22noise%22 type=%22saturate%22 values=%220.3%22/></filter><rect width=%22100%22 height=%22100%22 fill=%22%23FBF8F3%22/><rect width=%22100%22 height=%22100%22 fill=%22%23FBF8F3%22 filter=%22url(%23noise)%22 opacity=%220.4%22/></svg>')",
        'vintage-pattern': "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><defs><pattern id=%22dots%22 x=%2220%22 y=%2220%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22><circle cx=%2210%22 cy=%2210%22 r=%221%22 fill=%22%238FAEC9%22 opacity=%220.1%22/></pattern></defs><rect width=%22200%22 height=%22200%22 fill=%22%23FBF8F3%22/><rect width=%22200%22 height=%22200%22 fill=%22url(%23dots)%22/></svg>')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'unfold': 'unfold 2s ease-out',
        'seal-break': 'sealBreak 1.5s ease-out',
        'drift': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        unfold: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        sealBreak: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(30px) translateY(-30px)' },
          '50%': { transform: 'translateX(0) translateY(-60px)' },
          '75%': { transform: 'translateX(-30px) translateY(-30px)' },
        },
      },
      boxShadow: {
        'vintage': '0 10px 30px rgba(94, 114, 138, 0.15)',
        'envelope': '0 15px 40px rgba(94, 114, 138, 0.2)',
        'letter': '0 5px 20px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
