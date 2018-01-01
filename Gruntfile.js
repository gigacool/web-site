const generateSite = require('./sources/generateSite');

module.exports = (grunt) => {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'docs/stylesheets/screen.css': 'sources/stylesheets/screen.scss'
        }
      }
    },
    site: {
      default:{
        source:'sources/pages',
        destination:'docs'
      }
    },
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'sources/static', src: ['**'], dest: 'docs/'},
        ],
      },
    },
    watch: {
      stylesheets: {
        files: ['sources/stylesheets/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerMultiTask('site', generateSite);

  grunt.registerTask('default', ['sass', 'site', 'copy']);
}
