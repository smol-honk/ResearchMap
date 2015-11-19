namespace :state do
  desc "Goes through each person and updates their
  full_State field"
  task name: :environment do
    @people = Person.all
    @people.each do |person|
    person.state
    end
  end
end
