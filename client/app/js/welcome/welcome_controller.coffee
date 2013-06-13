welcome.controller 'WelcomeController',
  ['$scope', '$location', '$cookieStore', 'MapValues', 'Country',
   ($scope, $location, $cookieStore, MapValues, Country) -> 

    MapValues.setCurrent()
    
    $scope.learnFirstCountry = () ->
      firstCountry = Country.randomCountry()
      $cookieStore.put('firstCountry', firstCountry.code)
      $location.path("/country/#{firstCountry.name}")
      MapValues.setToday(firstCountry.code)

  ]
