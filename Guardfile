guard 'less', output: 'public/css' do
  watch(%r{^public/css/less/.+\.less$})
end

guard 'livereload' do
  watch(%r{public/.+\.(css|js|html)})
end

guard 'rspec', cli: '--color', version: 2 do
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^.+\.rb$}) { 'spec' }

  #watch('spec/spec_helper.rb')  { "spec" }

  #watch(%r{^lib/(.+)\.rb$})     { |m| "spec/lib/#{m[1]}_spec.rb" }
  #watch(%r{^app/controllers/(.+)_(controller)\.rb$})  { |m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
end

def run_karma
  puts ''
  system('karma start spec/js/karma_config.js')
  puts ''
  system('karma start spec/js/karma_e2e_config.js')
  puts ''
end
run_karma

guard 'shell' do
  watch(%r{spec/js/*}) { run_karma }
  watch(%r{public/js/*}) { run_karma }
end

