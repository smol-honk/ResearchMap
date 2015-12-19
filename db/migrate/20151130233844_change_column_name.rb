class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :researches, :lng, :longitude
  end
end
