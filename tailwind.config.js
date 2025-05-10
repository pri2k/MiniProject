// tailwind.config.js
export default {
    // mode: 'jit',
    purge: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          mainColour: '#D7A529',
          cream: '#fdf6ec',
        },
      },
    },
    plugins: [],
}