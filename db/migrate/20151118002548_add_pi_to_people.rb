class AddPiToPeople < ActiveRecord::Migration
  def change
    add_column :people, :PI, :string
  end
end
