require_relative 'user.rb'
require_relative 'country_entry.rb'

class CountryADay < Sinatra::Base
  before do
    @current_user ||= User.find_by_auth_token(request.cookies['auth_token'])
    @locals = { signed_in: @current_user.present?, current_user: @current_user.try(:name) }
  end

  get '/' do
    if @current_user
      @current_user.add_new_country_if_new_day
      @locals[:current_country] = @current_user.latest_country_code
      @locals[:countries] = @current_user.country_codes.join(',')
    end

    erb :index, locals: @locals
  end

  get '/signout' do
    set_auth_cookie(nil)
    redirect '/'
  end

  get '/auth/:name/callback' do
    user = User.signin_or_register(request.env['omniauth.auth'], request.cookies['firstCountry'])
    set_auth_cookie(user.auth_token)
    redirect '/'
  end

  def set_auth_cookie(value)
    response.set_cookie :auth_token, value: value,
                                     domain: settings.cookie_domain,
                                     max_age: '31557600',
                                     path: '/'
  end
end
