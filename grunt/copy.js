'use strict';

module.exports = {
  app: {
    files: [
      {
        expand: true,
        flatten: true,
        src: [
          'src/index.html',
          'src/css/app.css',
        ],
        dest: 'dist'
      },
    ]
  }
};
