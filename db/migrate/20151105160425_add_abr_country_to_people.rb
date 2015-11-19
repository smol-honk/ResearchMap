class AddAbrCountryToPeople < ActiveRecord::Migration
  def change
    add_column :people, :abr_Country, :string
  end
end
