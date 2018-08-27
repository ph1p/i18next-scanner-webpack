## i18next-scanner-webpack

[![npm](https://img.shields.io/npm/v/i18next-scanner-webpack.svg)](https://www.npmjs.com/package/i18next-scanner-webpack)

This is a simple i18n-scanner webpack-plugin.
Based on this package: [i18next-scanner](https://github.com/i18next/i18next-scanner).

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
      // no extensions needed. Extensions are defined in func.
      // See options at https://github.com/i18next/i18next-scanner#options
      // src defaults to ./src
      // dist defaults to ./locales
      options: {
        func: {
          list: ['t', '$t', 'i18next.t', 'i18n.t'], // default ['i18next.t', 'i18n.t']
          extensions: ['js', 'jsx'] // default ['js', 'jsx', 'vue']
        },
        lngs: ['en', 'de'],
        resource: {
          loadPath: '{{lng}}/{{ns}}.json',
          savePath: '{{lng}}/{{ns}}.json'
        }
      }
    })
    // minimal plugin options
    // new i18nextWebpackPlugin({
    //   options: {
    //     lngs: ['en', 'de']
    //   }
    // })
  ]
};
```

| Name    | Description                                    | default   | Optional |
| ------- | ---------------------------------------------- | --------- | -------- |
| src     | source path of files with i18next translations | ./src     | yes      |
| dist    | destination of translation files               | ./locales | yes      |
| options | all options                                    |           | yes      |

Available options: [here](https://www.i18next.com/configuration-options.html)
