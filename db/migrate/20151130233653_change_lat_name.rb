class ChangeLatName < ActiveRecord::Migration
  def change
    rename_column :researches, :lat, :latitude
  end
end
