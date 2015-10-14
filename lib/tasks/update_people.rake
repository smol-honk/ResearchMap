namespace :update_people do
  desc "Goes through each person and updates their 
  available status based on dates they were initialized with"
  task status: :environment do
    @people = Person.all
    @people.each do |person|
    person.update_donor_status
    person.update_active_status
    end
  end
end
