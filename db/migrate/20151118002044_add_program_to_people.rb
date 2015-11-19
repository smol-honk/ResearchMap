class AddProgramToPeople < ActiveRecord::Migration
  def change
    add_column :people, :program, :string
  end
end
