/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'], // Define "oxygen" as a custom font family
        blinker: ['Blinker', 'sans-serif'], // Define "blinker" as a custom font family
        Roboto: ['Roboto', 'sans-serif'], // Define "oxygen" as a custom font family
      },
      backgroundImage: {
        'flight-takeoff': "url('/Assets/FlightTakeOff.jpg')",
      },
    },
  },
  plugins: [],
}