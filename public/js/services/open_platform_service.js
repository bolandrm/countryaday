app.factory('OpenPlatform', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
  var cache = {}

  return {
    getNews: function(country) {
      if (cache.hasOwnProperty(country)) {
        return cache[country];
      } else {
        var news = $q.defer();
        var url = 'http://content.guardianapis.com/search?q=' + country +
                  '&page-size=6&callback=JSON_CALLBACK&api-key=5xqajxd3us7zfa6umhac5ee6';

        $http.jsonp(url).success(function(data) {
          cache[country] = data.response.results;
          $rootScope.loading.openPlatformComplete = true;
          news.resolve(data.response.results);
        });

        return news.promise;
      }
    }
  };
}]);
