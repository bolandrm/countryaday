require_relative 'integration_helper'

describe 'registration' do
  it 'creates user' do
    expect { visit '/auth/facebook/callback' }.to change{ User.all.count }.by(1)
  end

  it 'sets current country to their first country' do
    Capybara.current_session.driver.browser.set_cookie 'firstCountry=US'
    visit '/auth/facebook/callback'
    expect(passed_data('current-country')).to eq('US')
  end

  it 'randomizes current country when a first country has NOT been selected' do
    visit '/auth/facebook/callback'
    expect(passed_data('current-country').length).to eq(2)
  end
end

describe 'authentication' do
  before { signup }

  it 'allows users to sign out' do
    visit '/'
    expect(passed_data('signed-in')).to eq('false')
  end

  it 'allows users to sign in' do
    expect { visit '/auth/facebook/callback' }.to_not change { User.all.count }
    expect(passed_data('signed-in')).to eq('true')
  end
end

def signup
  visit '/auth/facebook/callback'
  visit '/signout'
end

def passed_data(attribute)
  find('body')["data-#{attribute}"]
end
