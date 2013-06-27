'use strict';

describe('country a day', function() {
  it('works', function() {
    browser().navigateTo('/#/country/united_states');
    expect(element('*[data-code="US"]').attr('fill')).toEqual('#555555');
    //expect(element('*[data-code="CA"]').attr('fill')).toEqual('#555555');
    expect(element('h2.country').text()).toEqual('United States');
  });
});
