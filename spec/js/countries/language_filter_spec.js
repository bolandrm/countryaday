'use strict';

describe("Language Filter", function() {
  var language;

  beforeEach(function() {
    module('countryaday');
    inject(function($filter) {
      language = $filter('expandLanguages');
    });
  });

  it('handles single', function() {
    expect(language('en')).toEqual('English');
  });

  it('handles multiple', function() {
    expect(language('en,fr')).toEqual('English, French');
  });

  it('handles region', function() {
    expect(language('en-US,fr')).toEqual('English(US), French');
  });

  it('handles unknown', function() {
    expect(language('en-US,fr,zz')).toEqual('English(US), French, ZZ');
  });
});
