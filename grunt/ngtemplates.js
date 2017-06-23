'use strict';

module.exports = {
  app: {
    src: 'src/**/*.tpl.html',
    dest: 'dist/templates.js',
    options: {
      htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true },
    }
  }
};
