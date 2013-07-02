countries.filter('titleize', function() {
  return function(text) {
    if (!text) { return ''; }
    return text.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});
