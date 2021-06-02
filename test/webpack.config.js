const path = require('path');
const I18nextWebpackPlugin = require('../index');

const i18nextPluginConfig = {
  dest: './test/locales',
  options: {
    attr: {
      extensions: ['.html']
    },
    func: {
      extensions: ['.js'],
      list: ['i18next.t', 'i18n.t', 't', '$t']
    },
    lngs: ['en', 'de']
  }
};

module.exports = {
  i18nextPluginConfig,
  config: {
    mode: 'development',
    entry: path.resolve(__dirname, './translate.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    plugins: [new I18nextWebpackPlugin(i18nextPluginConfig)]
  }
};
