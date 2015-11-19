namespace :country do
  desc "Goes through each person and updates their Location and
  abr_Country field"
  task name: :environment do
    @people = Person.all
    @people.each do |person|
    person.findLocation
    person.country
    end
  end
end
