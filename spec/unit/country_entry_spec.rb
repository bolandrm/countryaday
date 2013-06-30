require 'spec_helper'

describe CountryEntry do
  describe 'validations' do
    it 'does not allow same combination of user and code' do
      CountryEntry.create(user_id: 1, code: 'AU')
      expect(CountryEntry.new(user_id: 1, code: 'AU').valid?).to be_false
    end

    it { should validate_presence_of(:code) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe '.add_for_user' do
    it 'adds by country code if passed' do
      CountryEntry.add_for_user(4, 'AU')
      expect(CountryEntry.where(user_id: 4, code: 'AU').present?).to be_true
    end

    it 'removes quotes from passed code' do
      CountryEntry.add_for_user(4, '"AU"')
      expect(CountryEntry.where(user_id: 4).first.code).to_not include('"')
    end

    it 'selects random code if no code passed' do
      CountryEntry.add_for_user(4, 'AU')
      CountryEntry.add_for_user(4, 'US')
      CountryEntry.add_for_user(4, 'LY')

      c1, c2, c3 = CountryEntry.where(user_id: 4).to_a
      expect(c1 == c2 && c2 == c3).to be_false
    end
  end

  describe '.add_new_country_if_new_day' do
    it 'does not add a new country the same day' do
      CountryEntry.add_for_user(4)
      CountryEntry.add_new_country_if_new_day(4)
      expect(CountryEntry.where(user_id: 4).count).to eq(1)
    end

    it 'adds a new country the next day' do
      CountryEntry.add_for_user(4)
      Timecop.freeze(Date.today + 1.day) do
        CountryEntry.add_new_country_if_new_day(4)
        expect(CountryEntry.where(user_id: 4).count).to eq(2)
      end
    end
  end
end
