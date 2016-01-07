class AddLongandLatToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :longitude, :float
    add_column :researchers, :latitude, :float
  end
end
