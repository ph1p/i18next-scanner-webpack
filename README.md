## i18next-scanner-webpack


This is a simple i18n-scanner webpack-plugin.
Based on this package: [i18next-scanner](https://github.com/i18next/i18next-scanner).


**Example webpack.config.js**

```
const path = require('path');
const i18nextWebpackPlugin = require('i18next-scanner-webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new i18nextWebpackPlugin({
      src: path.resolve(__dirname, './src/**/*.{js,html}'),
      dest: path.resolve(__dirname, 'locales'),
      options: {
        func: {
          list: ['i18next.t', 'i18n.t']
        },
        lngs: ['en', 'de'],
        resource: {
          loadPath: '{{lng}}/{{ns}}.json',
          savePath: '{{lng}}/{{ns}}.json'
        }
      }
    })
  ]
};
```


| Name  |  Description | Optional |
|---|---|---|
| src  | source path of files with i18next translations | no |
| dist  | destination of translation files | no |
| options  | all options | yes |

Available options: [here](https://www.i18next.com/configuration-options.html)