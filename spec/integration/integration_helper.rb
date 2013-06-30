require 'spec_helper'
require 'capybara'
require 'timecop'

Capybara.app = app

# Don't show activerecord stuff during tests
ActiveRecord::Base.logger.level = Logger::INFO

RSpec.configure do |config|
  config.include Capybara::DSL
end


def signup
  signin
  visit '/signout'
end

def signin
  visit '/auth/facebook/callback'
end

def passed_data(attribute)
  find('body')["data-#{attribute}"]
end
