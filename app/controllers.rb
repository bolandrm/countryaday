require_relative 'user.rb'

class CountryADay < Sinatra::Base
  get '/' do
    erb :index
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
    user = User.from_omniauth(request.env['omniauth.auth'])
  end
end
