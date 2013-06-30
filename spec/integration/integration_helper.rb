require 'spec_helper'
require 'capybara'
require 'timecop'

Capybara.app = app

# Don't show activerecord stuff during tests
ActiveRecord::Base.logger.level = Logger::INFO

RSpec.configure do |config|
  config.include Capybara::DSL
end


def register
  visit '/auth/facebook/callback'
end

def register_and_signout
  register
  signout
end

def signin
  register
end

def signout
  visit 'signout'
end

def set_first_country_cookie(first_country)
  Capybara.current_session.driver.browser.set_cookie "firstCountry=#{first_country}"
end

def passed_data(attribute)
  find('body')["data-#{attribute}"]
end
