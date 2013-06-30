require_relative 'integration_helper'

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

