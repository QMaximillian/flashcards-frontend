const purgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
    process.env.NODE_ENV === 'production' ? cssnano({preset: 'default'}) : null,
    purgecss({
      content: ['./public/**/*.html', './src/**/*.js', './src/**/*.jsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
}
