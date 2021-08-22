module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		colors: {
			pink: {
				light: '#FF9EC1',
				dark: '#DD4A7E',
			},
		},
		backgroundImage: theme => ({
         'layout': "url('../img/background/bg2.png')",
        })
	},
  },
  plugins: [],
}