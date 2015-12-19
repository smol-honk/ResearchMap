class RemoveColumnFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :admin
    remove_column :users, :friend
  end
end
