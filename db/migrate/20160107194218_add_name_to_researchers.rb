class AddNameToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :name, :string
  end
end
