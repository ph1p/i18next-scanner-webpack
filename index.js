const scanner = require('i18next-scanner');
const vfs = require('vinyl-fs');
const path = require('path');

let i18nConfig = {};
function i18nextWebpackPlugin(config) {
  i18nConfig = config;
}

i18nextWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {

    if(!i18nConfig) {
        console.error('i18next-scanner:', 'i18n object is missing');
        return;
    }
    if(!i18nConfig.src) {
        console.error('i18next-scanner:', 'src path is missing');
        return;
    }
    if(!i18nConfig.dest) {
        console.error('i18next-scanner:', 'dest path is missing');
        return;
    }

    vfs
      .src(i18nConfig.src)
      .pipe(scanner(i18nConfig.options, i18nConfig.transform, i18nConfig.flush))
      .pipe(vfs.dest(i18nConfig.dest))
      .on('end', function() {
        callback();
      });
  });
};

module.exports = i18nextWebpackPlugin;
