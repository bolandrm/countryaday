require 'capybara'

Capybara.app = app

RSpec.configure do |config|
  config.include Capybara::DSL
end
