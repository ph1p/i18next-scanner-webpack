import webpack from 'webpack';
import rimraf from 'rimraf';

/**
 * Wait for webpack
 * @param {*} options
 */
exports.waitForWebpack = (options) =>
  new Promise((resolve, reject) => {
    webpack(options, () => resolve());
  });

/**
 * Remove locales folder
 */
exports.cleanUp = (webpackOptions) => {
  rimraf(webpackOptions.output.path.replace('dist', 'locales'), (_) => {});
  rimraf(webpackOptions.output.path, (_) => {});
};
