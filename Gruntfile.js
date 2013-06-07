module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Let's make sure the JavaScript is ok
    jshint: {
      all: [
        './app/scripts/collections',
        './app/scripts/models',
        './app/scripts/views',
        './app/app.controller.js',
        './app/app.js',
        './app/app.router.js',
        './app/templates.js'
      ]
    },
    requirejs: {
      compile: {
        options: {
          appDir: './app',
          baseUrl: './scripts',
          mainConfigFile: './app/scripts/main.js',
          dir: './build',
          modules: [
            {
              name: 'main'
            }
          ],
          fileExclusionRegExp: /^README.md|.editorconfig|.gitattributes|.gitignore|package.json|Gruntfile.js|.sass-cache|config.rb|.bowerrc|node_modules|sandbox|tests|sass|json|documentation|report|.git$/
        }
      }
    },
    // Hash our minified files and update any references to them
    hashres: {
      prod: {
        src: [
          'build/scripts/main.js',
          'build/styles/main.css'
        ],
        dest: './build/index.html'
      }
    }
  });

  // Load the jshint plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the requirejs plugin
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Load the Hashres plugin
  grunt.loadNpmTasks('grunt-hashres');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'hashres']);

};
