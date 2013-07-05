class CountryADay < Sinatra::Base
  def get_and_clear_flash_message
    flash = request.cookies['flash']
    set_flash_cookie(nil)
    flash
  end

  def set_flash_cookie(value)
    response.set_cookie :flash, value: value,
                                domain: settings.cookie_domain,
                                httponly: false,
                                path: '/'
  end

  def set_auth_cookie(value)
    response.set_cookie :auth_token, value: value,
                                     domain: settings.cookie_domain,
                                     max_age: '31557600',
                                     httponly: true,
                                     path: '/'
  end
end
