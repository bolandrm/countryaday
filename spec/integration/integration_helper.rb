require 'spec_helper'
require 'capybara'
require 'timecop'

Capybara.app = app

# Don't show activerecord stuff during tests
ActiveRecord::Base.logger.level = Logger::INFO

RSpec.configure do |config|
  config.include Capybara::DSL
end
