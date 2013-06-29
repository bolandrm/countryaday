require 'spec_helper'

describe User do
  describe 'validations' do
    it { should validate_presence_of(:uid) }
    it { should validate_presence_of(:provider) }
  end

  describe '.from_omniauth' do
    let(:user) { User.from_omniauth(OmniAuth.config.mock_auth[:twitter]) }

    it 'creates user' do
      expect(user.persisted?).to be_true
    end

    it 'sets uid and provider' do
      expect(user.uid).to eq('12345')
      expect(user.provider).to eq('twitter')
    end

    it 'sets name to info.nickname if available, info.name otherwise' do
      expect(user.name).to eq('twitternick')

      user = User.from_omniauth(OmniAuth.config.mock_auth[:google_oauth2])
      expect(user.name).to eq('gmname')
    end

    it 'sets email if present' do
      expect(user.email).to be_nil

      user = User.from_omniauth(OmniAuth.config.mock_auth[:google_oauth2])
      expect(user.email).to eq('usr@gmail.com')
    end

    it 'gets previously created user' do
      user2 = User.from_omniauth(OmniAuth.config.mock_auth[:twitter])
      expect(user).to eq(user2)
    end

    it 'fetches user based on uid and provider' do
      user2 = User.from_omniauth(OmniAuth.config.mock_auth[:facebook])
      expect(user).to_not eq(user2)
    end
  end
end
