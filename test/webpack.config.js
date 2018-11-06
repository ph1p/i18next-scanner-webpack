const path = require('path');
const i18nextWebpackPlugin = require('../index');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './translate.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new i18nextWebpackPlugin({
      dest: './test/locales',
      options: {
        func: {
          extensions: ['.js'],
          list: ['i18next.t', 'i18n.t', 't', '$t']
        },
        lngs: ['en', 'de']
      }
    })
  ]
};
