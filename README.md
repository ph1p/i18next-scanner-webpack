## i18next-scanner-webpack

[![npm](https://img.shields.io/npm/v/i18next-scanner-webpack.svg)](https://www.npmjs.com/package/i18next-scanner-webpack) [![Build Status](https://github.com/ph1p/i18next-scanner-webpack/workflows/Test%20and%20publish%20to%20npm/badge.svg)]()

This is a simple i18n-scanner webpack-plugin.
Based on this package: [i18next-parser](https://github.com/i18next/i18next-parser).

### Requirements

- Node.js >= 14.16.0
- Webpack 5.x

### Installation

```bash
npm install i18next-scanner-webpack --save-dev
# or
yarn add i18next-scanner-webpack --dev
```

### Usage

**Example webpack.config.js (ESM)**

```javascript
import path from 'node:path';
import I18nextWebpackPlugin from 'i18next-scanner-webpack';

export default {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new I18nextWebpackPlugin({
      // src defaults to ./src
      // dest defaults to ./ (project root folder)
      // default ['.js', '.jsx', '.vue']
      extensions: ['.js', '.jsx'],
      // See options at https://github.com/i18next/i18next-parser#options
      options: {
        lexers: {
          js: [
            {
              lexer: 'JavascriptLexer',
              // default ['t']
              functions: ['t', '$t', 'i18next.t', 'i18n.t']
            }
          ]
        },
        locales: ['en', 'de'],
        // defaults to locales/$LOCALE/$NAMESPACE.json
        output: '$LOCALE/$NAMESPACE.json'
      }
    })
  ]
};
```

**Example webpack.config.js (CommonJS)**

```javascript
const path = require('path');
const I18nextWebpackPlugin = require('i18next-scanner-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new I18nextWebpackPlugin({
      options: {
        locales: ['en', 'de']
      }
    })
  ]
};
```

**Minimal setup:**

```javascript
import path from 'node:path';
import I18nextWebpackPlugin from 'i18next-scanner-webpack';

export default {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new I18nextWebpackPlugin({
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
import path from 'node:path';
import I18nextWebpackPlugin from 'i18next-scanner-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new I18nextWebpackPlugin({
      options: {
        locales: ['en', 'de']
      },
      async: true
    })
  ]
};
```

### Options

| Name       | Description                                    | default                 | Optional |
| ---------- | ---------------------------------------------- | ----------------------- | -------- |
| src        | source path of files with i18next translations | ./src                   | yes      |
| dest       | destination of translation files               | ./locales               | yes      |
| options    | all options                                    |                         | yes      |
| async      | If true, immediately report back to webpack    | false                   | yes      |
| extensions | file extensions to scan                        | ['.js', '.jsx', '.vue'] | yes      |

For more options, see: [i18next-parser documentation](https://github.com/i18next/i18next-parser#options)
