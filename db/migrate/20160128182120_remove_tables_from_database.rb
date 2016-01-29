class RemoveTablesFromDatabase < ActiveRecord::Migration
  def change
    drop_table :researches_users
    drop_table :researchers_users
  end
end
