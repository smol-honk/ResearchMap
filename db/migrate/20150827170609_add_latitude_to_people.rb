class AddLatitudeToPeople < ActiveRecord::Migration
  def change
    add_column :people, :latitude, :decimal
  end
end
