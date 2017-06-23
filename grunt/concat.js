'use strict';

module.exports = {
  options: {
    stripBanners: {
      block: true
    },
    sourceMap: true
  },
  app: {
    src: [
      'src/**/*.module.js',
      'src/app.js',
      'src/**/*.js',
    ],
    dest: 'dist/bundle.concat.js'
  },
  vendors: {
    src: [
    ],
    dest: 'dist/vendors.concat.js'
  }
};
