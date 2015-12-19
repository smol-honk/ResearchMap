class AddFriendsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :friend, :boolean, default: false
  end
end
