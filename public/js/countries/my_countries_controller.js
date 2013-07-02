countries.controller('MyCountriesController', [
  '$rootScope', '$scope', '$routeParams', 'User', 'Country',
  function($rootScope, $scope, $routeParams, User, Country) {
    $scope.totalCountries = Country.totalCountries();
  
    var progress = User.countries.progress;
    $scope.countriesLearned = [];
    for (var index in progress) {
      $scope.countriesLearned.push(index);
    }

    $scope.percent = Math.round($scope.countriesLearned.length/$scope.totalCountries*100);
  }
]);
