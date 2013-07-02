countries.controller('MyCountriesController', [
  '$scope', '$http', 'User', 'Country', function($scope, $http, User, Country) {
    $scope.totalCountries = Country.totalCountries();
    $scope.totalLearned = User.countries.numLearned();
    $scope.percent = Math.round($scope.totalLearned/$scope.totalCountries*100);

    $http({method: 'GET', cache: true, url: '/my-countries.json'}).success(function(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].name = Country.fromCode(data[i].code).name;
      }
      $scope.countriesLearned = data;
    });
  }
]);
