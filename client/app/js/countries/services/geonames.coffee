countries.factory 'GeoNames',
  ['$http', '$q', ($http, $q) ->
    cache = {}

    getInfo: (countryCode) ->
      if cache.hasOwnProperty(countryCode)
        cache[countryCode]
      else
        info = $q.defer()
        url = "http://api.geonames.org/countryInfoJSON?username=countryaday&country=#{countryCode}&callback=JSON_CALLBACK"

        $http.jsonp(url).success (data) ->
          data = data.geonames[0]
          cache[countryCode] = data
          info.resolve data

        info.promise
  ]
