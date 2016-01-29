class ChangeTripPasses < ActiveRecord::Migration
  def change
    change_column :trip_passes, :researcher_accept, :boolean, :default => false
  end
end
