app.controller('WelcomeController', [
  '$scope', '$location', '$cookieStore', 'User', 'Country',
  function ($scope, $location, $cookieStore, User, Country) {
    User.countries.setCurrent();

    $scope.firstCountry = User.countries.today;
    
    $scope.learnFirstCountry = function() {
      var firstCountry = Country.randomCountry();

      $cookieStore.put('firstCountry', firstCountry.code);
      $location.path('/country/' + firstCountry.name);
      User.countries.setToday(firstCountry.code);
    };
  }
]);
