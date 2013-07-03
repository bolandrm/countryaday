app.filter('addCommas', function() {
  return function(number) {
    if (number === undefined) { return ''; }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
});
