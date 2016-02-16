class AddResearchToTripPasses < ActiveRecord::Migration
  def change
    add_reference :trip_passes, :research, index: true, foreign_key: true
  end
end
