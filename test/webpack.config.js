const path = require('path');
const I18nextWebpackPlugin = require('../index');

const i18nextPluginConfig = {
  dest: './test',
  extensions: ['js', 'html'],
  options: {
    locales: ['en', 'de'],
    lexers: {
      js: [{
        lexer: 'JavascriptLexer',
        functions: ['i18next.t', 'i18n.t', 't', '$t']
      }]
    }
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
