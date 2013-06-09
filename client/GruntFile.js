module.exports = function(grunt) {
  grunt.initConfig({
    test: {},
    coffee: {
      compile: {
        options: { bare: true },
        files: { 'app/js/app.js': ['app/js/app.coffee', 'app/js/**/*.coffee'] }
      }
    },
    uglify: {
      development: {
        options: { beautify: true, compress: false, mangle: false },
        files: { 'app/js/app.min.js': ['app/lib/flat/js/jquery-1.8.3.min.js',
                                       'app/lib/jquery-jvectormap-1.2.2/jquery-jvectormap-1.2.2.min.js',
                                       'app/lib/jquery-jvectormap-1.2.2/jquery-jvectormap-world-mill-en.js',
                                       'app/lib/angular/angular.js',
                                       'app/lib/angular/angular-cookies.js',
                                       'app/js/app2.js']
        }
      },
      production: {
        files: { 'app/js/app_prod.min.js': ['app/lib/flat/js/jquery-1.8.3.min.js',
                                            'app/lib/jquery-jvectormap-1.2.2/jquery-jvectormap-1.2.2.min.js',
                                            'app/lib/jquery-jvectormap-1.2.2/jquery-jvectormap-world-mill-en.js',
                                            'app/lib/angular/angular.js',
                                            'app/lib/angular/angular-cookies.js',
                                            'app/js/app2.js']
        }
      }
    },
    less: {
      compile: {
        options: {
          paths: [ 'app/css/less' ],
          yuicompress: true
        },
        files: { 'app/css/app.css': 'app/css/less/*.less' }
      }
    },
    watch: {
      options: { livereload: true },
      coffee: {
        files: ['app/js/{,*/}*.coffee'],
        tasks: ['coffee:compile']
      },
      html: { files: ['app/*.html', 'app/**/*.html', 'app/js/**/*.html'], tasks: [] },
      less: { 
        files: ['app/css/less/*.less'],
        tasks: ['less:compile']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'dev');
  grunt.registerTask('dev', ['coffee', 'less', 'watch']);
}
