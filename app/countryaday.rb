require_relative 'models/user.rb'
require_relative 'models/country_entry.rb'
require_relative 'helpers/cookies.rb'

class CountryADay < Sinatra::Base
  before do
    @current_user ||= User.find_by_auth_token(request.cookies['auth_token'])
    @locals = { signed_in: @current_user.present?, current_user: @current_user.try(:name) }
  end

  get '/' do
    @locals[:flash] = get_and_clear_flash_message

    if @current_user
      if @current_user.add_new_country_if_new_day
        @locals[:flash] += ' Your country for today is __todaysCountry__!'
      end
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
    @current_user = nil
    set_flash_cookie('Thanks for visiting. You are now signed out.')
    redirect '/'
  end

  get '/auth/:name/callback' do
    user = User.signin_or_register(request.env['omniauth.auth'], request.cookies['firstCountry'])
    set_auth_cookie(user.auth_token)
    set_flash_cookie('Welcome! You are now signed in.')
    redirect '/'
  end

  get '/*' do
    redirect '/'
  end
end
