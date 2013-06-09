'use strict'

# Create App Module
app = angular.module('countryaday', ['ngCookies', 'welcome', 'countries', 'map'])

app.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/welcome', 
      templateUrl: 'views/welcome/index.html'
      controller: 'WelcomeController'
    .when '/country/:country',
      templateUrl: 'views/countries/show.html'
      controller: 'CountriesController'
      resolve:
        checkCountry: ['$route', '$location', 'Country', ($route, $location, Country) ->
          unless Country.isValidCountry($route.current.params.country)
            $location.path('/welcome')
        ]
        summary: ['$route', 'Wikipedia', ($route, Wikipedia) ->
          Wikipedia.getSummary($route.current.params.country)
        ]
        info: ['$route', 'GeoNames', 'Country', ($route, GeoNames, Country) ->
          country = Country.fromName($route.current.params.country)
          GeoNames.getInfo(country.code)
        ]
        news: ['$route', 'Feedzilla', ($route, Feedzilla) ->
          Feedzilla.getNews($route.current.params.country)
        ]
    .otherwise
      redirectTo: '/welcome'
  ]

app.run ['$rootScope', '$cookies', ($rootScope, $cookies) ->
  $rootScope.$on '$routeChangeStart', (event, next, current) ->
    $rootScope.username = $cookies['username']
  ]

# Create Sub-Modules
welcome = angular.module('welcome', [])
countries = angular.module('countries', [])
map = angular.module('map', [])

