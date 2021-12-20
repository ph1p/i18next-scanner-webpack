const { transform } = require('i18next-parser');
const vfs = require('vinyl-fs');
const path = require('path');

const isModule = (filePath) => !path.isAbsolute(filePath) && !filePath.startsWith('/') && !filePath.startsWith('./');
const removeDuplicatesFromArray = (arr) => Array.from(new Set(arr).values());

const searchForAllFilePaths = (currentEntry, depth = 0) => {
  let paths = [];

  if (Array.isArray(currentEntry) || Array.isArray(currentEntry.import)) {
    let entriesInCurrentEntry = currentEntry;
    if (currentEntry.import) {
      entriesInCurrentEntry = currentEntry.import;
    }

    paths = entriesInCurrentEntry.filter((e) => !isModule(e)).map((e) => path.dirname(e));
  } else {
    if (!isModule(currentEntry)) {
      paths.push(path.dirname(currentEntry));
    }
  }

  return paths;
};
class I18nextWebpackPlugin {
  constructor(config) {
    this.extensions = ['.js', '.jsx', '.vue'];
    this.i18nConfig = config;

    if (this.i18nConfig.extensions) {
      this.extensions = this.i18nConfig.extensions
    }

    // Remove leading dot
    this.extensions = this.extensions.map((ext) => ext.replace(/^\./, ''));
  }

  apply(compiler) {
    // check source directory
    if (!this.i18nConfig.src) {
      // entry
      const entry = compiler.options.entry;

      if (typeof entry === 'string') {
        this.i18nConfig.src = [path.dirname(entry)];
      } else if (typeof entry === 'object') {
        // filter relative paths
        let entries = [];
        Object.keys(entry).forEach((e) => {
          entries = entries.concat(searchForAllFilePaths(entry[e]));
        });

        this.i18nConfig.src = removeDuplicatesFromArray(entries);
      }
    }
    // check dest directory
    if (!this.i18nConfig.dest) {
      this.i18nConfig.dest = path.join(__dirname.split('node_modules')[0], './');
    }

    compiler.hooks.emit.tapAsync('i18nextWebpackPlugin', (compilation, callback) => {
      if (!this.i18nConfig) {
        console.error('i18next-scanner:', 'i18n object is missing');
        return;
      }
      if (!this.i18nConfig.src || this.i18nConfig.src.length === 0) {
        console.error('i18next-scanner:', 'src path is missing');
        return;
      }
      if (!this.i18nConfig.dest) {
        console.error('i18next-scanner:', 'dest path is missing');
        return;
      }

      const commaSeperatedExtensions = this.extensions.map((ext) => ext.replace(/^\./, '')).join(',');

      vfs
        .src(
          this.i18nConfig.src.map((e) =>
            path.join(
              e,
              `**/*.${this.extensions.length === 1 ? commaSeperatedExtensions : `{${commaSeperatedExtensions}}`}`
            )
          )
        )
        .pipe(new transform(this.i18nConfig.options))
        .pipe(vfs.dest(this.i18nConfig.dest))
        .on('end', () => {
          if (this.i18nConfig.async) {
            console.log('i18next-scanner: done.');
          } else {
            callback();
          }
        });

      if (this.i18nConfig.async) {
        callback();
      }
    });
  }
}

module.exports = I18nextWebpackPlugin;
