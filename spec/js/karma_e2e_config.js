// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  //'../../public/vendor/angular/angular.min.js',
  //'../../public/vendor/angular/angular-*.js',
  //'../../public/js/app.js',
  //'../../public/js/**/*.js',
  '../../spec/js/e2e/**/*spec.js'
];

colors = true;

autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)

//browsers = ['Chrome'];
browsers = ['PhantomJS'];
singleRun = true;

proxies = {
  '/': 'http://localhost:3000/'
};

urlRoot = "__karma__";

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
