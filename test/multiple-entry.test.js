import fs from 'node:fs';
import path from 'node:path';
import { __dirname, cleanUp, waitForWebpack } from './utils.js';
import webpackOptions from './webpack.config.js';

describe('webpack', () => {
  beforeAll(async () => {
    cleanUp(webpackOptions.config);

    return waitForWebpack(
      Object.assign(webpackOptions.config, {
        entry: {
          client: ['@babel/polyfill', path.resolve(__dirname, './translate.js')]
        }
      })
    );
  });

  afterEach(() => cleanUp(webpackOptions.config));

  test('Test webpack implementation (multiple entries)', () => {
    // clean up
    const localeEnglish = JSON.parse(fs.readFileSync('./test/locales/en/translation.json', 'utf8'));
    const localeGerman = JSON.parse(fs.readFileSync('./test/locales/de/translation.json', 'utf8'));

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
