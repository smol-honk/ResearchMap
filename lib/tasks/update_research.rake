namespace :update_research do
  desc "Goes through each Research and updates its
  available status based on dates they were initialized with"
  task status: :environment do
    @research = Research.all
    @research.each do |r|
      r.update_dates()
    end
  end
end
