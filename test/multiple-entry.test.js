import webpack from 'webpack';
import rimraf from 'rimraf';
import path from 'path';
import webpackOptions from './webpack.config';
import i18nextWebpackPlugin from '../index';

/**
 * Wait for webpack
 * @param {*} options
 */
const waitForWebpack = options =>
  new Promise((resolve, reject) => {
    webpack(options, () => resolve());
  });

describe('webpack', () => {
  it('Test webpack implementation (multiple entries)', async () => {
    await waitForWebpack(
      Object.assign(webpackOptions, {
        entry: {
          client: ['@babel/polyfill', path.resolve(__dirname, './translate.js')]
        }
      })
    );

    // clean up
    const localeEnglish = require('./locales/en/translation.json');
    const localeGerman = require('./locales/de/translation.json');

    rimraf(webpackOptions.output.path.replace('dist', 'locales'), ok => {});
    rimraf(webpackOptions.output.path, ok => {});

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
  });
});
