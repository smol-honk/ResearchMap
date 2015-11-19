class AddCoPiToPeople < ActiveRecord::Migration
  def change
    add_column :people, :coPI, :string
  end
end
