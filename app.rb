require 'sinatra/base'
require 'sinatra/activerecord'

require 'yaml'
require 'omniauth'
require 'omniauth-facebook'
require 'omniauth-twitter'
require 'omniauth-google-oauth2'

class CountryADay < Sinatra::Base
  ENV.update YAML.load(File.read(File.expand_path('../config/application.yml', __FILE__)))
  register Sinatra::ActiveRecordExtension

  configure :development, :test do
    set :cookie_domain, ''
    use Rack::Session::Cookie
  end

  configure :production do
    use Rack::Session::Cookie, secret: ENV['RACK_SESSION_COOKIE_SECRET']
  end

  use OmniAuth::Builder do
    provider :facebook, ENV['FACEBOOK_ID'], ENV['FACEBOOK_SECRET']
    provider :twitter, ENV['TWITTER_ID'], ENV['TWITTER_SECRET']
    provider :google_oauth2, ENV['GOOGLE_ID'], ENV['GOOGLE_SECRET']
  end

  require_relative 'app/controllers.rb'
end
