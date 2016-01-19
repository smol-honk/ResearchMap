class CreateTripPasses < ActiveRecord::Migration
  def change
    create_table :trip_passes do |t|
      t.string :location
      t.float :longitude
      t.float :latitude
      t.date :dateStart
      t.date :dateEnd
      t.references :user, index: true, foreign_key: true
      t.references :researcher, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
