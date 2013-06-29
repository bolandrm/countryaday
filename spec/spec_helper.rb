ENV['RACK_ENV'] = 'test'

require_relative '../app.rb'
require 'rspec'
require 'rack/test'
require 'database_cleaner'
require 'shoulda-matchers'

DatabaseCleaner.strategy = :transaction

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.before { DatabaseCleaner.clean_with :truncation }
  config.after { DatabaseCleaner.clean_with :truncation }
end

def app
  CountryADay 
end

OmniAuth.config.test_mode = true
OmniAuth.config.add_mock :twitter,
                         uid: '12345', info: { nickname: 'twitternick' }
OmniAuth.config.add_mock :facebook,
                         uid: '12345', info: { nickname: 'fbnick', email: 'usr@fb.com' }
OmniAuth.config.add_mock :google_oauth2,
                         uid: '12345', info: { name: 'gmname', email: 'usr@gmail.com' }
