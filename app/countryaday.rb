require_relative 'models/user.rb'
require_relative 'models/country_entry.rb'

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

  get '/my-countries.json' do
    redirect '/' unless @current_user
    @current_user.add_new_country_if_new_day
    @current_user.country_entries.order('created_at DESC').map do |e|
      { code: e.code, date: e.created_at.strftime('%m / %d / %Y') }
    end.to_json
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

  get '/*' do
    redirect '/'
  end

  def set_auth_cookie(value)
    response.set_cookie :auth_token, value: value,
                                     domain: settings.cookie_domain,
                                     max_age: '31557600',
                                     path: '/'
  end
end
