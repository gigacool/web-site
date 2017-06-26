module.exports = (grunt) => {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

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

  grunt.registerTask('default', ['sass']);
}
