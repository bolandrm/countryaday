app.factory('User', ['$cookieStore', 'Country', function($cookieStore, Country) {
  var import_user_data = function() {
    var body = angular.element('body');

    if (body.attr('data-signed-in') === 'false' && $cookieStore.get('firstCountry')) {
      firstCountryCode = $cookieStore.get('firstCountry');
      user.countries.setToday(firstCountryCode);
    } else if (body.attr('data-countries') != null) {
      var learnedCountries = body.attr('data-countries').split(',');
      for (var i = 0; i < learnedCountries.length; i++) {
        user.countries.progress[learnedCountries[i]] = 'learned';
      }
      user.countries.setToday(body.attr('data-current-country'));
      $cookieStore.remove('firstCountry');
    }
  };

  var user = {};
  user.signedIn = (angular.element('body').attr('data-signed-in') === 'true' ? true : false);

  user.countries = {
    progress: {},
    today: '',

    setToday: function(todaysCode) {
      for (var code in this.progress) {
        if (this.progress[code] === 'today') {
          this.progress[code] = 'initial';
          break;
        }
      }
      this.progress[todaysCode] = 'today';
      this.today = Country.fromCode(todaysCode).name;
    },

    setCurrent: function(currentCode) {
      for (var code in this.progress) {
        if (this.progress[code] === 'current') {
          this.progress[code] = 'initial';
          break;
        }
      }
      if (currentCode && this.progress[currentCode] !== 'today') {
        this.progress[currentCode] = 'current';
      }
    },

    numLearned: function() {
      var count = 0;
      for (var index in this.progress) {
        count++;
      }
      return count;
    }
  };

  import_user_data();

  return user;
}]);
