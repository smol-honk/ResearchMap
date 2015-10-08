set :environment, "development"
set :ouput, {:error => "log/cron_error_log.log", :standard =>"log/cron_log.log"}

every 1.day, :at => '12:00 am' do
  rake "update_people:status"
end
  