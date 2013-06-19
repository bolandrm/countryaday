desc 'Start server on port 3000 through Shotgun.'
task :s do
  `bundle exec shotgun config.ru -p 3000`
end

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

task :default do
  puts `rake -T`
end
