const scanner = require('i18next-scanner');
const vfs = require('vinyl-fs');
const path = require('path');

let i18nConfig = {};
let extensions = ['js', 'jsx', 'vue'];

function i18nextWebpackPlugin(config) {
  i18nConfig = config;

  if (i18nConfig.options.func) {
    if (!i18nConfig.options.func.list) {
      i18nConfig.options.func.list = ['i18next.t', 'i18n.t'];
    }

    if (i18nConfig.options.func.extensions) {
      extensions = i18nConfig.options.func.extensions;
    } else {
      i18nConfig.options.func.extensions = extensions;
    }
  }

  if (!i18nConfig.options.resource) {
    i18nConfig.options.resource = {
      loadPath: '{{lng}}/{{ns}}.json',
      savePath: '{{lng}}/{{ns}}.json'
    };
  }
}

i18nextWebpackPlugin.prototype.apply = compiler => {
  // entry
  const entry = compiler.options.entry;

  // check source directory
  if (!i18nConfig.src) {
    const entry = compiler.options.entry;

    i18nConfig.src = entry.substring(0, entry.lastIndexOf('/'));
  }
  // check dest directory
  if (!i18nConfig.dest) {
    i18nConfig.dest = path.resolve(entry, '../../', 'locales');
  }

  compiler.plugin('emit', (compilation, callback) => {
    if (!i18nConfig) {
      console.error('i18next-scanner:', 'i18n object is missing');
      return;
    }
    if (!i18nConfig.src) {
      console.error('i18next-scanner:', 'src path is missing');
      return;
    }
    if (!i18nConfig.dest) {
      console.error('i18next-scanner:', 'dest path is missing');
      return;
    }

    console.log(path.join(i18nConfig.src, `**/*.{${extensions.join(',')}}`));
    vfs
      .src(path.join(i18nConfig.src, `**/*.{${extensions.join(',')}}`))
      .pipe(scanner(i18nConfig.options, i18nConfig.transform, i18nConfig.flush))
      .pipe(vfs.dest(i18nConfig.dest))
      .on('end', () => callback());
  });
};

module.exports = i18nextWebpackPlugin;
