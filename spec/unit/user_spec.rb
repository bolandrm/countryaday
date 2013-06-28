require 'spec_helper'

describe User do
  describe 'validations' do
    let(:user_info) { { uid: '12345',
                        provider: 'twitter',
                        name: 'username',
                        email: 'test@example.com' } }
    let(:user) { User.new(user_info) }

    it 'can have a valid user' do
      expect(user).to be_valid
    end
    
    it 'must have a UID' do
      user.uid = nil
      expect(user).to_not be_valid
    end

    it 'must have a provider' do
      user.provider = nil
      expect(user).to_not be_valid
    end
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
  end
end
