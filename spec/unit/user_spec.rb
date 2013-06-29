require 'spec_helper'

describe User do
  describe 'validations' do
    it { should validate_presence_of(:uid) }
    it { should validate_presence_of(:provider) }
  end

  describe 'associations' do
    it { should have_many(:country_entries) }
  end

  describe '.signin_or_register' do
    let(:user) { User.signin_or_register(OmniAuth.config.mock_auth[:twitter]) }

    context 'register' do
      it 'creates user' do
        expect(user.persisted?).to be_true
      end

      it 'sets uid and provider' do
        expect(user.uid).to eq('12345')
        expect(user.provider).to eq('twitter')
      end

      it 'sets name to info.nickname if available, info.name otherwise' do
        expect(user.name).to eq('twitternick')

        user = User.signin_or_register(OmniAuth.config.mock_auth[:google_oauth2])
        expect(user.name).to eq('gmname')
      end

      it 'sets email if present' do
        expect(user.email).to be_nil

        user = User.signin_or_register(OmniAuth.config.mock_auth[:google_oauth2])
        expect(user.email).to eq('usr@gmail.com')
      end

      it 'adds country entry if first country passed in' do
        user = User.signin_or_register(OmniAuth.config.mock_auth[:twitter], 'US')
        expect(user.country_codes).to include('US')
      end

      it 'adds country entry if first country passed in' do
        user2 = User.signin_or_register(OmniAuth.config.mock_auth[:facebook])
        expect(user.country_codes.first).to_not eq(user2.country_codes.first)
      end
    end

    context 'signin' do
      it 'gets previously created user' do
        user2 = User.signin_or_register(OmniAuth.config.mock_auth[:twitter])
        expect(user).to eq(user2)
      end

      it 'does not create a new CountryEntry' do
        initial_code_count = user.country_codes.count
        user2 = User.signin_or_register(OmniAuth.config.mock_auth[:twitter])
        expect(initial_code_count).to eq(user2.country_codes.count)
      end

      it 'fetches user based on uid and provider' do
        user2 = User.signin_or_register(OmniAuth.config.mock_auth[:facebook])
        expect(user).to_not eq(user2)
      end
    end
  end
end
