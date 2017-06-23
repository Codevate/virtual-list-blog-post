'use strict';

module.exports = {
  js: {
    files: ['src/app.js', 'src/**/*.{js,tpl.html}'],
    tasks: ['clean:js', 'ngtemplates', 'concat:app', 'babel', 'minify:app'],
    options: {
      livereload: true
    }
  }
};
