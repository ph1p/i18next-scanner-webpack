import path from 'path';
import webpackOptions from './webpack.config';
import { cleanUp, waitForWebpack } from './utils';
import I18nextWebpackPlugin from '../index';

delete webpackOptions.config.plugins;

const webpackConfigWithAsync = Object.assign(webpackOptions.config, {
  plugins: [
    new I18nextWebpackPlugin({
      ...webpackOptions.i18nextPluginConfig,
      async: true
    })
  ]
});

describe('webpack', () => {
  beforeEach(async () => {
    cleanUp(webpackConfigWithAsync);

    return waitForWebpack(
      Object.assign(webpackConfigWithAsync, {
        entry: {
          client: ['@babel/polyfill', path.resolve(__dirname, './translate.js')]
        }
      })
    );
  });

  afterEach(() => cleanUp(webpackConfigWithAsync));

  test('Test webpack implementation (one entry with async flag)', async () => {
    expect.assertions(2);

    return new Promise((resolve) => {
      setTimeout(() => {
        const localeEnglish = require('./locales/en/translation.json');
        const localeGerman = require('./locales/de/translation.json');

        expect(localeEnglish).toEqual({
          'hi-iam-t': '',
          'hi-iam-$t': '',
          'hi-iam-i18next': '',
          'hi-iam-i18n': '',
          deep: {
            deeper: ''
          },
          trans: {
            html: {
              key: ''
            }
          }
        });
        expect(localeGerman).toEqual({
          'hi-iam-t': '',
          'hi-iam-$t': '',
          'hi-iam-i18next': '',
          'hi-iam-i18n': '',
          deep: {
            deeper: ''
          },
          trans: {
            html: {
              key: ''
            }
          }
        });
        resolve();
      }, 3000);
    });
  });
});
