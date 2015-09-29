class AddDonorToPeople < ActiveRecord::Migration
  def change
    add_column :people, :donor, :boolean
  end
end
