import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rimrafSync } from 'rimraf';
import webpack from 'webpack';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/**
 * Wait for webpack
 * @param {*} options
 */
export const waitForWebpack = (options) =>
  new Promise((resolve, _) => {
    webpack(options, () => resolve());
  });

/**
 * Remove locales folder
 */
export const cleanUp = (webpackOptions) => {
  rimrafSync(webpackOptions.output.path.replace('dist', 'locales'));
  rimrafSync(webpackOptions.output.path);
};
