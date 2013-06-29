require_relative 'user.rb'
require_relative 'country_entry.rb'

class CountryADay < Sinatra::Base
  get '/' do
    current_country = request.cookies['firstCountry']
    erb :index, locals: { current_country: current_country }
  end

  #get '/signin' do
  #  response.set_cookie :username, value: 'ryan',
  #                                        domain: settings.cookie_domain,
  #                                        secure: request.secure?,
  #                                        path: request.script_name
  #  redirect '/'
  #end

  #get '/signout' do
  #  response.delete_cookie :username
  #  redirect '/'
  #end

  get '/auth/:name/callback' do
    user = User.signin_or_register(request.env['omniauth.auth'])
    redirect '/'
  end
end
