class AddDatesAbroadToPeople < ActiveRecord::Migration
  def change
    add_column :people, :datesAbroad, :date
  end
end
