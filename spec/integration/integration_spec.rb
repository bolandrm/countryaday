require_relative 'integration_helper'

describe 'integration' do
  describe 'signup' do
    it 'creates user' do
      expect { visit '/auth/facebook/callback' }.to change{ User.all.count }.by(1)
    end

    context 'when a first country has been selected' do
      before do
        Capybara.current_session.driver.browser.set_cookie 'firstCountry=US'
      end

      it 'sets current country to their first country' do
        visit '/auth/facebook/callback'
        current_country = find('body')['data-current-country']
        expect(current_country).to eq('US')
      end
    end

    context 'when a first country has NOT been selected' do
      it 'sets current country to a random country' do
        visit '/auth/facebook/callback'
        current_country = find('body')['data-current-country']
        #expect(current_country).to eq('US')
      end
    end
  end
end
