require 'spec_helper'
require_relative 'integration_helper'

describe 'integration' do
  describe '/' do
    it 'works' do
      visit '/'
      expect(page).to have_content('Country a Day')
    end
  end
end
