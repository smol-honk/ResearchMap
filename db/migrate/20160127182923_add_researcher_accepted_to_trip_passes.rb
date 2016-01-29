class AddResearcherAcceptedToTripPasses < ActiveRecord::Migration
  def change
    add_column :trip_passes, :researcher_accept, :boolean
  end
end
