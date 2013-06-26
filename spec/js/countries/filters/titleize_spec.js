'use strict';

describe("Titleize Filter", function() {
  var titleize;

  beforeEach(function() {
    module('countryaday');
    inject(function($filter) {
      titleize = $filter('titleize');
    });
  });

  it('Capitalizes each word and removes underscores', function() {
    expect(titleize('united_states')).toEqual('United States');
  });

  it('works for single words', function() {
    expect(titleize('uganda')).toEqual('Uganda');
  });

  it('works for 3 words', function() {
    expect(titleize('united_arab_emirates')).toEqual('United Arab Emirates');
  });
});
