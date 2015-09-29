class AddDateEndToPeople < ActiveRecord::Migration
  def change
    add_column :people, :dateEnd, :date
  end
end
