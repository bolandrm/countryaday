countries.factory 'Wikipedia',
  ['$http', '$q', ($http, $q) ->
    cache = {}

    extractParagraphs = (data) ->
      # sort through the json.
      data = data.query.pages
      # pages is an object with 1 key
      for k,v of data
        data = v.revisions[0]['*']
        break

      content = document.createElement('div')
      content.innerHTML = data;

      for table in content.querySelectorAll('table')
        table.parentNode.removeChild(table)

      for link in content.querySelectorAll('a')
        href = link.getAttribute('href')
        unless href.charAt(1) == '/'
          link.setAttribute('href', "http://wikipedia.org#{href}")

      (p.innerHTML for p in content.querySelectorAll('p'))

    getSummary: (country) ->
      if cache.hasOwnProperty(country)
        cache[country]
      else
        summary = $q.defer()
        url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&rvparse=1&titles=#{country}&format=json&redirects=1&callback=JSON_CALLBACK"

        $http.jsonp(url).success (data) ->
          paragraphs = extractParagraphs(data)

          cache[country] = paragraphs
          summary.resolve paragraphs

        summary.promise
  ]
