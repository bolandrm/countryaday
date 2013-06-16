countries.controller('CountriesController', [
  '$rootScope', '$scope', '$routeParams', 'User', 'Country', 'summary', 'info', 'news',
  function($rootScope, $scope, $routeParams, User, Country, summary, info, news) {
    $scope.country = $routeParams.country;
    $scope.code = Country.fromName($scope.country).code;

    User.countries.setCurrent($scope.code);

    $scope.info = info;
    $scope.news = news;
    $scope.paragraphs = summary;
  }
]);
