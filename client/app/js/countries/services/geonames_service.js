countries.factory('GeoNames', ['$http', '$q', function($http, $q) {
  var API_USERNAME = 'countryaday';
  var cache = {};

  return {
    getInfo: function(countryCode) {
      if (cache.hasOwnProperty(countryCode)) {
        return cache[countryCode];
      } else {
        var info = $q.defer();
        var url = 'http://api.geonames.org/countryInfoJSON?username=' + API_USERNAME + 
                  '&country=' + countryCode + '&callback=JSON_CALLBACK';

        $http.jsonp(url).success(function(data) {
          var data = data.geonames[0];
          cache[countryCode] = data;
          info.resolve(data);
        });

        return info.promise;
      }
    }
  }
}]);
