'use strict';

module.exports = {
  options: {
    sourceMap: true,
    sourceMapIncludeSources: true,
    sourceMapIn: function (path) {
      return path + '.map';
    }
  },
  app: {
    src: 'dist/bundle.concat.js',
    dest: 'dist/bundle.min.js'
  },
  vendors: {
    src: 'dist/vendors.concat.js',
    dest: 'dist/vendors.min.js'
  }
};
