countries.factory('Wikipedia', ['$http', '$q', function($http, $q) {
  var cache = {};

  var extractParagraphs = function(data) {
    // sort through the json.
    data = data.query.pages;
    // pages is an object with 1 key
    for (var key in data) {
      data = data[key].revisions[0]['*'];
      break;
    }

    // Create a div to store data so we can manipulate it
    var content = document.createElement('div');
    content.innerHTML = data;

    // Remove all tables
    var tables = content.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      table.parentNode.removeChild(table);
    }

    // Fix links so that they point to wikipedia properly
    var links = content.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href');
      if (href.charAt(1) !== '/') {
        link.setAttribute('href', 'http://wikipedia.org' + href);
      }
    }

    // Grab <p> tags and get their HTML
    var htmlPs = content.querySelectorAll('p');
    var paragraphs = [];
    for (var i = 0; i < htmlPs.length; i++) {
      paragraphs.push(htmlPs[i].innerHTML);
    }

    return paragraphs;
  };

  return { 
    getSummary: function(country) {
      if (cache.hasOwnProperty(country)) {
        return cache[country];
      } else {
        var summary = $q.defer();
        var url = 'http://en.wikipedia.org/w/api.php?action=query' +
                  '&prop=revisions&rvprop=content&rvsection=0&rvparse=1&titles=' +
                  country + "&format=json&redirects=1&callback=JSON_CALLBACK";

        $http.jsonp(url).success(function(data) {
          var paragraphs = extractParagraphs(data);

          cache[country] = paragraphs;
          summary.resolve(paragraphs);
        });

        return summary.promise
      }
    }
  }
}]);
