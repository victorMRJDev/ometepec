/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/renderer/.html,jsx,js', 
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/components**/*.{html,js,jsx,ts,tsx}',

    // './src/renderer**/*.{svelte,js,ts,jsx,tsx}', 
    // './src/rederer/components/**/*.{jsx,js,html}',
    // './src/rederer/screens/**/*.{svelte,jsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        pantone207C: {
          DEFAULT: '#ab0033',
          80: 'rgba(171, 0, 51, 0.8)',
          60: 'rgba(171, 0, 51, 0.6)',
          40: 'rgba(171, 0, 51, 0.4)',
          20: 'rgba(171, 0, 51, 0.2)'
        },
        pantone465C: {
          DEFAULT: '#bc955c',
          80: 'rgba(188, 149, 92, 0.8)',
          60: 'rgba(188, 149, 92, 0.6)',
          40: 'rgba(188, 149, 92, 0.4)',
          20: 'rgba(188, 149, 92, 0.2)'
        },
        pantone468C: {
          DEFAULT: '#ddc9a3',
          80: 'rgba(221, 201, 163, 0.8)',
          60: 'rgba(221, 201, 163, 0.6)',
          40: 'rgba(221, 201, 163, 0.4)',
          20: 'rgba(221, 201, 163, 0.2)'
        },
        pantoneCoolGray11C: {
          DEFAULT: '#54565a',
          80: 'rgba(84, 86, 90, 0.8)',
          60: 'rgba(84, 86, 90, 0.6)',
          40: 'rgba(84, 86, 90, 0.4)',
          20: 'rgba(84, 86, 90, 0.2)'
        },
        primary: '#F5F5F5'
      },
      fontFamily: {
        'calibri-bold': ['calibri-bold', 'sans-serif'],
        'calibri-italic': ['calibri-italic', 'sans-serif'],
        'calibri-regular': ['calibri-regular', 'sans-serif'],

        'encodesans-bold': ['EncodeSans-Bold', 'sans-serif'],
        'encodesans-light': ['EncodeSans-Light', 'sans-serif'],
        'encodesans-medium': ['EncodeSans-Medium', 'sans-serif'],
        'encodesans-regular': ['EncodeSans-Regular', 'sans-serif'],

        'kanit-bold': ['Kanit-Bold', 'sans-serif'],
        'kanit-light': ['Kanit-Light', 'sans-serif'],
        'kanit-medium': ['Kanit-Medium', 'sans-serif'],
        'kanit-regular': ['Kanit-Regular', 'sans-serif']
      }
    }
  },
  plugins: []
}
