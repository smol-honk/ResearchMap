class AddAbbreviatedStateToPeople < ActiveRecord::Migration
  def change
    add_column :people, :abr_State, :string
  end
end
