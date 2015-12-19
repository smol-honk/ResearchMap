class AddNameToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :first_name, :string
    add_column :researchers, :last_name, :string
  end
end
