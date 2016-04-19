class RemoveFieldFromResearches < ActiveRecord::Migration
  def change
    remove_column :researches, :day, :boolean
    remove_column :researches, :week, :boolean
    remove_column :researches, :day_date, :boolean
  end
end
