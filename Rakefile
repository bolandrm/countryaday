desc 'Start server on port 3000 through Shotgun.'
task :s do
  sh 'bundle exec rackup -p 3000'
end

desc 'startup guard for livereload, less compile, test run, etc'
task :d do
  sh 'bundle exec guard'
end

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

task :default do
  puts `rake -T`
end
