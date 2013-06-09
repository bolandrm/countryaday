countries.filter 'addCommas', () ->
  (number) ->
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
