welcome.controller('WelcomeController', [
  '$scope', '$location', '$cookieStore', 'User', 'Country',
  function ($scope, $location, $cookieStore, User, Country) {
    User.countries.setCurrent();
    
    $scope.learnFirstCountry = function() {
      var firstCountry = Country.randomCountry();
      console.log(firstCountry.name);

      $cookieStore.put('firstCountry', firstCountry.code);
      $location.path('/country/' + firstCountry.name);
      User.countries.setToday(firstCountry.code);
    };
  }
]);
