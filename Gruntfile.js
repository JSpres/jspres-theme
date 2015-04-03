module.exports = function(grunt) {

  grunt.initConfig({
  pkg : grunt.file.readJSON('package.json'),
      less: {
        development: {
          files: {
            "styles/css/jspres-light.theme.css": "styles/less/jspres-light.theme.less",
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
          files: ['styles/less/*.less'],
          tasks: ['less', 'notify:watch'],
        },
      },

      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: "JSpres theme", // defaults to the name in package.json, or will use project directory's name
          success: false, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      notify: {
        watch: {
          options: {
            title: 'Watch Detected', 
            message: 'LESS finished.',
          }
        }
      }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.task.run('notify_hooks');
    
    grunt.registerTask('default', ['less', 'watch']);
};