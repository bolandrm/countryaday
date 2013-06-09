countries.filter 'titleize', () ->
  (text) ->
    text.replace(/_/g, ' ').replace /\w\S*/g, (txt) ->
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
