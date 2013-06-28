require_relative 'integration_helper'

describe 'integration' do
  describe 'signup' do
    it 'creates user' do
      expect { visit '/auth/facebook/callback' }.to change{ User.all.count }.by(1)
    end

    it 'redirects user to their first country'
  end

  describe 'login' do

  end
end
