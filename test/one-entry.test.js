import path from 'path';
import webpackOptions from './webpack.config';
import { cleanUp, waitForWebpack } from './utils';

describe('webpack', () => {
  beforeEach(async () => {
    cleanUp(webpackOptions);

    return waitForWebpack(
      Object.assign(webpackOptions, {
        entry: {
          client: ['@babel/polyfill', path.resolve(__dirname, './translate.js')]
        }
      })
    );
  });

  afterEach(() => cleanUp(webpackOptions));

  test('Test webpack implementation (one entry)', () => {
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
