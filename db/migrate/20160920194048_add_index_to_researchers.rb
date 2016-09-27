class AddIndexToResearchers < ActiveRecord::Migration
  def change
    add_index :researchers, :username, :unique => true
  end
end
