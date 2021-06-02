import path from 'path';
import webpackOptions from './webpack.config';
import { cleanUp, waitForWebpack } from './utils';

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
  });
});
