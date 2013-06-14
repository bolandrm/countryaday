map.directive('worldmap', [
  '$location', 'Country', 'MapValues', function($location, Country, MapValues) {
    return {
      restrict: 'E',
      template: '<div class="map"></div>',
      replace: true,
      scope: {},
      controller: [
        '$scope', '$element', 'MapValues', function($scope, $element, MapValues) {
          var onClick, updateColors;

          onClick = function(e, code) {
            return $scope.$apply(function() {
              return $location.path("/country/" + (Country.fromCode(code).name));
            });
          };
          updateColors = function() {
            return $element.vectorMap('get', 'mapObject').series.regions[0].setValues($scope.mapValues);
          };
          $scope.mapValues = MapValues.values;
          $scope.$watch('mapValues', updateColors, true);
          return $element.vectorMap({
            map: 'world_mill_en',
            zoomButtons: true,
            backgroundColor: '#FFFFFF',
            regionStyle: {
              initial: {
                fill: '#8D8D8D'
              }
            },
            series: {
              regions: [
                {
                  attribute: 'fill',
                  scale: {
                    'current': '#555555',
                    'today': '#E74C3c',
                    'learned': '#27AE60',
                    'initial': '#8D8D8D'
                  }
                }
              ]
            },
            onRegionClick: onClick
          });
        }
      ]
    };
  }
]);

countries.factory('MapValues', [
  '$cookieStore', function($cookieStore) {
    var MapValues, firstCountryCode;

    MapValues = {};
    MapValues.values = {};
    MapValues.setToday = function(code) {
      var k, v, _ref;

      _ref = this.values;
      for (k in _ref) {
        v = _ref[k];
        if (v === 'today') {
          this.values[k] = 'initial';
          break;
        }
      }
      return this.values[code] = 'today';
    };
    MapValues.setCurrent = function(code) {
      var k, v, _ref;

      _ref = this.values;
      for (k in _ref) {
        v = _ref[k];
        if (v === 'current') {
          this.values[k] = 'initial';
          break;
        }
      }
      if (code && this.values[code] !== 'today') {
        return this.values[code] = 'current';
      }
    };
    if ($cookieStore.get('firstCountry')) {
      firstCountryCode = $cookieStore.get('firstCountry');
      MapValues.setToday(firstCountryCode);
    }
    return MapValues;
  }
]);
