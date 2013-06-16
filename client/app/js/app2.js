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
