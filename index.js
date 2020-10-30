const scanner = require('i18next-scanner');
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

    if (this.i18nConfig.options.func) {
      if (!this.i18nConfig.options.func.list) {
        this.i18nConfig.options.func.list = ['i18next.t', 'i18n.t'];
      }

      // Prevent "Unable to parse Trans component with the content" error
      if (!this.i18nConfig.options.trans) {
        this.i18nConfig.options.trans = {
          component: 'Trans',
          i18nKey: 'i18nKey',
          defaultsKey: 'defaults',
          extensions: ['.jsx'],
          fallbackKey: false
        };
      }

      if (this.i18nConfig.options.func.extensions) {
        this.extensions = this.i18nConfig.options.func.extensions.slice();
      } else {
        this.i18nConfig.options.func.extensions = this.extensions.slice();
      }
    }

    if (this.i18nConfig.options.attr) {
      if (this.i18nConfig.options.attr.extensions) {
        this.extensions = this.extensions.concat(this.i18nConfig.options.attr.extensions);
      }
    }

    // Remove leading dot
    this.extensions = this.extensions.map((ext) => ext.replace(/^\./, ''));
    if (!this.i18nConfig.options.resource) {
      this.i18nConfig.options.resource = {
        loadPath: '{{lng}}/{{ns}}.json',
        savePath: '{{lng}}/{{ns}}.json'
      };
    }
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
      this.i18nConfig.dest = path.join(__dirname.split('node_modules')[0], 'locales');
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
        .pipe(scanner(this.i18nConfig.options, this.i18nConfig.transform, this.i18nConfig.flush))
        .pipe(vfs.dest(this.i18nConfig.dest))
        .on('end', () => callback());
    });
  }
}

module.exports = I18nextWebpackPlugin;
