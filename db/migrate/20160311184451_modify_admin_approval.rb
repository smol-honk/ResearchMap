class ModifyAdminApproval < ActiveRecord::Migration
  def change
    change_column :trip_passes, :admin_approval, :boolean, :default => false
  end
end
