module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if using the app directory
  ],
  theme: {
    extend: {
        colors:{
            dark:{
                1:'#1C1F2E',
                2:'#161925',
            }
        },
    },
  },
  plugins: [],
};
