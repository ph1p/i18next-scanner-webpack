## i18next-scanner-webpack

[![npm](https://img.shields.io/npm/v/i18next-scanner-webpack.svg)](https://www.npmjs.com/package/i18next-scanner-webpack) [![Build Status](https://github.com/ph1p/i18next-scanner-webpack/workflows/Test%20and%20publish%20to%20npm/badge.svg)]()

This is a simple i18n-scanner webpack-plugin.
Based on this package: [i18next-parser](https://github.com/i18next/i18next-parser).

**Example webpack.config.js**

```javascript
const path = require('path');
const i18nextWebpackPlugin = require('i18next-scanner-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new i18nextWebpackPlugin({
      // src defaults to ./src
      // dest defaults to ./ (project root folder)
      // default ['.js', '.jsx', '.vue']
      extensions: ['.js', '.jsx']
      // See options at https://github.com/i18next/i18next-parser#options
      options: {
        lexers: {
          js: [{
            lexer: 'JavascriptLexer',
            // default ['t']
            functions: ['t', '$t', 'i18next.t', 'i18n.t'],
          }]
        },
        locales: ['en', 'de'],
        // defaults to locales/$LOCALE/$NAMESPACE.json
        output: '$LOCALE/$NAMESPACE.json'
      }
    })
  ]
};
```

**Minimal setup:**

```javascript
const path = require('path');
const i18nextWebpackPlugin = require('i18next-scanner-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new i18nextWebpackPlugin({
      options: {
        locales: ['en', 'de']
      }
    })
  ]
};
```

**Faster dev loops:**

If `async` option is `true`, the plugin will not wait for `i18next-scanner` to finish before reporting back to webpack. Useful in large projects or when using an expensive `transform`.

```javascript
const path = require('path');
const i18nextWebpackPlugin = require('i18next-scanner-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new i18nextWebpackPlugin({
      options: {
        locales: ['en', 'de']
      },
      async: true
    })
  ]
};
```

| Name      | Description                                    | default   | Optional |
| --------- | ---------------------------------------------- | --------- | -------- |
| src       | source path of files with i18next translations | ./src     | yes      |
| dest      | destination of translation files               | ./locales | yes      |
| options   | all options                                    |           | yes      |
| async     | If true, immediately report back to webpack    | false     | yes      |

Available options: [here](https://github.com/i18next/i18next-parser#options)
