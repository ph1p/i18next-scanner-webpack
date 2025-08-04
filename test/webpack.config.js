import path from 'node:path';
import I18nextWebpackPlugin from '../index.js';  // Add .js extension for ESM compatibility
import { __dirname } from './utils.js';

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

const Config = {
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

export default Config;