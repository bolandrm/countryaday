app.controller('CountryController', [
  '$rootScope', '$scope', '$routeParams', 'Country', 'summary', 'info', 'news',
  function($rootScope, $scope, $routeParams, Country, summary, info, news) {
    $scope.country = $routeParams.country;
    $scope.code = Country.fromName($scope.country).code;

    $scope.info = info;
    $scope.news = news;
    $scope.paragraphs = summary;
  }
]);
