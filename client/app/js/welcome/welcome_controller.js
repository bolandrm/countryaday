welcome.controller('WelcomeController', [
  '$scope', '$location', '$cookieStore', 'MapValues', 'Country',
  function ($scope, $location, $cookieStore, MapValues, Country) {
    MapValues.setCurrent();
    
    $scope.learnFirstCountry = function() {
      var firstCountry = Country.randomCountry();
      console.log(firstCountry.name);

      $cookieStore.put('firstCountry', firstCountry.code);
      $location.path('/country/' + firstCountry.name);
      MapValues.setToday(firstCountry.code);
    };
  }
]);
