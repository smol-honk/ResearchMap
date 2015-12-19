class Droptablesadminandfriends < ActiveRecord::Migration
  def change
    drop_table :admins
    drop_table :friends
  end
end
