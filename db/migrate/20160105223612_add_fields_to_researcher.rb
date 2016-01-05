class AddFieldsToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :current_location, :string
    add_column :researchers, :available, :boolean
    add_column :researchers, :week, :boolean
    add_column :researchers, :day, :boolean
    add_column :researchers, :day_available, :date
    add_column :researchers, :weekDateStart, :date
    add_column :researchers, :weekDateEnd, :date
  end
end
