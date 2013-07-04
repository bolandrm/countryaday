app.factory('Feedzilla', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
  var cache = {}

  return {
    getNews: function(country) {
      if (cache.hasOwnProperty(country)) {
        return cache[country];
      } else {
        var news = $q.defer();
        var url = 'http://api.feedzilla.com/v1/articles.json?q=' + country +
                  '&title_only=1&count=6&callback=JSON_CALLBACK';

        $http.jsonp(url).success(function(data) {
          cache[country] = data.articles;
          $rootScope.loading.feedzillaComplete = true;
          news.resolve(data.articles);
        });

        return news.promise;
      }
    }
  };
}]);
