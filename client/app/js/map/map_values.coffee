countries.factory 'MapValues', ['$cookieStore', ($cookieStore) ->

    MapValues = {}
    MapValues.values = {}

    MapValues.setToday = (code) ->
      for k, v of this.values
        if v == 'today'
          this.values[k] = 'initial'
          break
      this.values[code] = 'today'

    MapValues.setCurrent = (code) ->
      for k, v of this.values
        if v == 'current'
          this.values[k] = 'initial'
          break
      if code && this.values[code] != 'today'
        this.values[code] = 'current'

    if $cookieStore.get('firstCountry')
      firstCountryCode = $cookieStore.get('firstCountry')
      MapValues.setToday(firstCountryCode)

    MapValues

  ]
