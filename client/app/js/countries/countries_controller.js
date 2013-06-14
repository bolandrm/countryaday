countries.controller('CountriesController', [
  '$rootScope', '$scope', '$routeParams', 'MapValues', 'Country', 'summary', 'info', 'news',
  function($rootScope, $scope, $routeParams, MapValues, Country, summary, info, news) {
    $scope.country = $routeParams.country;
    $scope.code = Country.fromName($scope.country).code;

    MapValues.setCurrent($scope.code);

    $scope.info = info;
    $scope.news = news;
    $scope.paragraphs = summary;
  }
]);
