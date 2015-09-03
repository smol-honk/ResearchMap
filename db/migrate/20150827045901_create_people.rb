class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :Name
      t.string :Location
      t.decimal :Longitude
      t.decimal :Latitude

      t.timestamps null: false
    end
  end
end
