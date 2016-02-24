class AddDeclinedToTripPasses < ActiveRecord::Migration
  def change
    add_column :trip_passes, :researcher_declined, :boolean, :default => false
  end
end
