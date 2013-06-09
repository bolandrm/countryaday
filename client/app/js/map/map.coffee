map.directive 'worldmap', 
  ['$location', 'Country', 'MapValues', ($location, Country, MapValues) ->
    restrict: 'E'
    template: '<div class="map"></div>'
    replace: true
    scope: {}
    controller: ['$scope', '$element', 'MapValues', ($scope, $element, MapValues) ->
      onClick = (e, code) ->
        $scope.$apply () ->
          $location.path("/country/#{Country.fromCode(code).name}")

      updateColors = () ->
        $element.vectorMap('get', 'mapObject').series.regions[0].setValues($scope.mapValues)

      $scope.mapValues = MapValues.values
      $scope.$watch('mapValues', updateColors, true)

      $element.vectorMap
        map: 'world_mill_en' 
        zoomButtons: true
        backgroundColor: '#FFFFFF'
        regionStyle: 
          initial:
            fill: '#8D8D8D'
        series: 
          regions: [
            attribute: 'fill'
            scale:
              #'current': '#E67E22' # Orange
              'current': '#555555' # Dark Gray
              'today': '#E74C3c' # Red
              'learned': '#27AE60' # Green
              'initial': '#8D8D8D' # Light Gray
          ]
        onRegionClick: onClick
    ]
  ]
