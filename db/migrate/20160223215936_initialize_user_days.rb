class InitializeUserDays < ActiveRecord::Migration
  def change
    change_column :users, :days, :integer, :default => 0
  end
end
