module.exports = function (grunt) {
  
  grunt.initConfig({
    //remove unnecessary css properties
    uncss: {
      dist: {
        files: {
          'uncss.css': ['views/pizza.html']
        }
      }
    },
    //minify javascript
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/perfmatters.min.js': ['js/perfmatters.js'],
          'views/js/main.min.js': ['views/js/main.js'],
          'views/js/temp.min.js': ['views/js/temp.js']
        }
      }
    },
    cssmin: {
      target1: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      },
      target2: {
        files: [{
          expand: true,
          cwd: 'views/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'views/css/',
          ext: '.min.css'
        }]
      },
      target3: {
        files: [{
          expand: true,
          cwd: '',
          src: ['*.css', '!*.min.css'],
          dest: '',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {                                     // Task 
      dist: {                                      // Target 
        options: {                                 // Target options 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files 
          'views/pizza.min.html': 'views/pizza.html'    // 'destination': 'source' 
          
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
};