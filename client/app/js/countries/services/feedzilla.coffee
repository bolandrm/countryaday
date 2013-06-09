countries.factory 'Feedzilla',
  ['$http', '$q', ($http, $q) ->
    cache = {}

    getNews: (country) ->
      if cache.hasOwnProperty(country)
        cache[country]
      else
        news = $q.defer()
        url = "http://api.feedzilla.com/v1/articles.json?q=#{country}&title_only=1&count=6&callback=JSON_CALLBACK"

        $http.jsonp(url).success (data) ->
          cache[country] = data.articles
          news.resolve data.articles

        news.promise
  ]
