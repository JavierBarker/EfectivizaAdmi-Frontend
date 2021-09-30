module.exports = {
  purge: [],
  purge: [ './src/**/*.{html, ts}', './projects/**/*.{html, ts}' ],
  retroMode: true,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
