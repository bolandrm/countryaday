'use strict'

// Create App Module
var app = angular.module('countryaday', ['ngCookies', 'welcome', 'countries', 'users']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/welcome', {
      templateUrl: 'views/welcome/index.html',
      controller: 'WelcomeController'
    })
    .when('/my-countries', {
      templateUrl: 'views/mycountries/index.html',
      controller: 'MyCountriesController'
    })
    .when('/country/:country', {
      templateUrl: 'views/countries/show.html',
      controller: 'CountriesController',
      resolve: {
        checkCountry: ['$route', '$location', 'Country',
          function($route, $location, Country) {
            if (Country.fromName($route.current.params.country) === null) {
              $location.path('/welcome');
            }
          }
        ],
        summary: ['$route', 'Wikipedia', function($route, Wikipedia) {
          return Wikipedia.getSummary($route.current.params.country);
        }],
        info: ['$route', 'GeoNames', 'Country', function($route, GeoNames, Country) {
          var country = Country.fromName($route.current.params.country);
          return GeoNames.getInfo(country.code);
        }],
        news: ['$route', 'Feedzilla', function($route, Feedzilla) {
          return Feedzilla.getNews($route.current.params.country);
        }]
      }
    })
    .otherwise({ redirectTo: '/welcome' });
}]);

app.run(['$rootScope', 'User', function($rootScope, User) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    $rootScope.user = User;
  });
}]);

// Create Sub-Modules
var welcome = angular.module('welcome', []);
var countries = angular.module('countries', []);
var users = angular.module('users', []);
