// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../../public/vendor/flat/js/jquery-1.8.3.min.js',
  '../../public/vendor/angular/angular.min.js',
  '../../public/vendor/angular/angular-*.js',
  '../../public/js/app.js',
  '../../public/js/**/*.js',
  '../../spec/js/unit/**/*spec.js'
];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];

colors = true;
logLevel = LOG_INFO;

autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
