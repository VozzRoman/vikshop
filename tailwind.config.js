/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',

	// purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	content: [
		// Example content paths...
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue,cjs,mjs}',
	 ],
	darkMode: "media", // or 'media' or 'class'
	theme: {
	  extend: {},
	},
	variants: {
	  extend: {},
	},
	plugins: [],
 }

