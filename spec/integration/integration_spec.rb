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
    expect { signin }.to_not change { User.all.count }
    expect(passed_data('signed-in')).to eq('true')
  end
end

describe 'countries' do
  before { signin }

  it 'passes lastest country to client' do
    latest_code = User.first.latest_country_code
    expect(passed_data('current-country')).to eq(latest_code)
  end

  it 'passes all previous countries to client' do
    user = User.first
    first_code = user.country_entries.first.code
    user.country_entries.create(code: 'RU')
    user.country_entries.create(code: 'AU')
    user.country_entries.create(code: 'LY')

    signin
    latest_code = User.first.latest_country_code
    expect(passed_data('countries')).to eq("#{first_code},RU,AU,LY")
  end

  it 'does not show a new country the same day' do
    first_country = passed_data('current-country')
    Timecop.freeze(Date.today + 1.minute) do
      visit '/'
      expect(passed_data('current-country')).to eq(first_country)
    end
  end

  it 'shows a new country the next day' do
    first_country = passed_data('current-country')
    Timecop.freeze(Date.today + 1.day) do
      visit '/'
      expect(passed_data('current-country')).to_not eq(first_country)
    end
  end
end

def signup
  signin
  visit '/signout'
end

def signin
  visit '/auth/facebook/callback'
end

def passed_data(attribute)
  find('body')["data-#{attribute}"]
end
