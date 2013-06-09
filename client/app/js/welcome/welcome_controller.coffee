welcome.controller 'WelcomeController',
  ['$scope', '$location', '$cookieStore', 'MapValues', 'Country',
   ($scope, $location, $cookieStore, MapValues, Country) -> 

    MapValues.setCurrent()
    
    $scope.learnFirstCountry = () ->
      firstCountry = Country.randomCountryCode()
      $cookieStore.put('firstCountry', firstCountry)
      $location.path("/country/#{Country.fromCode(firstCountry).name}")
      MapValues.setToday(firstCountry)

  ]
