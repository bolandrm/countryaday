require 'sinatra/base'
require 'sinatra/reloader'

require 'yaml'
require 'omniauth'
require 'omniauth-facebook'
require 'omniauth-twitter'
require 'omniauth-google-oauth2'

class CountryADay < Sinatra::Base
  ENV.update YAML.load(File.read(File.expand_path('../config/application.yml', __FILE__)))

  use Rack::Session::Cookie, secret: ENV['RACK_SESSION_COOKIE_SECRET']
  use OmniAuth::Builder do
    provider :facebook, ENV['FACEBOOK_ID'], ENV['FACEBOOK_SECRET']
    provider :twitter, ENV['TWITTER_ID'], ENV['TWITTER_SECRET']
    provider :google_oauth2, ENV['GOOGLE_ID'], ENV['GOOGLE_SECRET']
  end

  configure do
    set :public_folder, File.dirname(__FILE__) + '/public'
    set :cookie_domain, ''
  end
  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/signin' do
    response.set_cookie :username, value: 'ryan',
                                          domain: settings.cookie_domain,
                                          secure: request.secure?,
                                          path: request.script_name
    redirect '/'
  end

  get '/signout' do
    response.delete_cookie :username
    redirect '/'
  end

  get '/auth/:name/callback' do
    request.env['omniauth.auth'].to_hash.inspect
  end
end
