module.exports = function(grunt) {

  grunt.initConfig({
  pkg : grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          base: '.'
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["src/"]
        },
        files: {
          "dist/bootstrap.css": "src/bootstrap.less",
          "dist/jspres.theme.css": "src/jspres.theme.less",
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/bootstrap.min.css': [
            'dist/bootstrap.css',
          ],
          'dist/jspres.theme.min.css': [
            'dist/jspres.theme.css',
          ],
        }
      }
    },

    // Append a timestamp to JS and CSS files which are located in 'index.html'
    cachebreaker: {
      dev: {
        options: {
          match: [
            'dist/bootstrap.min.css',
            'dist/jspres.theme.min.css',
          ],
        },
        files: {
          src: ['index.html']
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      less: {
        options: {
          livereload: false
        },
        files: ['src/*.less'],
        tasks: ['less', 'cssmin', 'notify:watch', 'cachebreaker'],
      },
    },

    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "Le Bus", // defaults to the name in package.json, or will use project directory's name
        success: false, // whether successful grunt executions should be notified automatically
        duration: 1 // the duration of notification in seconds, for `notify-send only
      }
    },

    notify: {
      watch: {
        options: {
          title: 'Watch Detected',
          message: 'LESS and minification finished.',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.task.run('notify_hooks');

  grunt.registerTask('default', ['less', 'cssmin', 'cachebreaker', 'connect', 'watch']);
  grunt.registerTask('build', ['less', 'cssmin', 'cachebreaker']);
};