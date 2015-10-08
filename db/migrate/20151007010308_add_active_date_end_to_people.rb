class AddActiveDateEndToPeople < ActiveRecord::Migration
  def change
    add_column :people, :activeDateEnd, :date
  end
end
