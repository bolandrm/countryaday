'use strict'

// Create App Module
var app = angular.module('countryaday', ['ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      resolve: {
        routing: ['$route', '$location', 'User', function($route, $location, User) {
          if (User.countries.today) {
            $location.path('/country/' + User.countries.today);
          } else {
            $location.path('/welcome');
          }
        }]
      }
    })
    .when('/welcome', {
      templateUrl: 'js/views/welcome.html',
      controller: 'WelcomeController'
    })
    .when('/my-countries', {
      templateUrl: 'js/views/my-countries.html',
      controller: 'MyCountriesController'
    })
    .when('/country/:country', {
      templateUrl: 'js/views/country.html',
      controller: 'CountryController',
      resolve: {
        routing: ['$rootScope', '$route', '$location', 'User', 'Country',
          function($rootScope, $route, $location, User, Country) {
            var country = Country.fromName($route.current.params.country);
            if (country === null) { 
              $location.path('/');
            } else {
              User.countries.setCurrent(country.code);
              $rootScope.loading = { country: $route.current.params.country };
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
    .otherwise({ redirectTo: '/' });
}]);

app.run(['$rootScope', '$location', 'Country', 'User', 
  function($rootScope, $location, Country, User) {
    $rootScope.user = User;

    $rootScope.$on('$routeChangeStart', function(event, current, previous) { });
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $rootScope.loading = false;
    });
  }
]);
