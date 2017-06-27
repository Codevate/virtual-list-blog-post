'use strict';

module.exports = {
  js: {
    files: ['src/app.js', 'src/**/*.{js,tpl.html}'],
    tasks: ['build'],
    options: {
      livereload: true
    }
  },
  static: {
    files: ['src/index.html', 'src/css/app.css'],
    tasks: ['build'],
    options: {
      livereload: true
    }
  }
};
