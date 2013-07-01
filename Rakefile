require 'sinatra/activerecord/rake'
require './app'

desc 'Start server on port 3000 with autoreload.'
task :s do
  sh 'bundle exec shotgun config.ru -p 3000'
end

desc 'startup guard for livereload, less compile, test run, etc'
task :d do
  sh 'bundle exec guard'
end

desc 'start console'
task :c do
  sh 'racksh'
end

desc 'compile less'
task :less do
  sh '/usr/local/share/npm/bin/lessc public/css/less/app.less public/css/app.css'
end

task :default do
  puts `rake -T`
end
