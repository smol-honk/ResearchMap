class DropFriends < ActiveRecord::Migration
  def change
    drop_table :friends
  end
end
