class RemoveColumnsFromResearchers < ActiveRecord::Migration
  def change
  	remove_column :researchers, :invitation_token
  	remove_column :researchers, :invitation_created_at
  	remove_column :researchers, :invitation_sent_at
  	remove_column :researchers, :invitation_accepted_at
  	remove_column :researchers, :invitation_limit
  	remove_column :researchers, :invited_by_id
  	remove_column :researchers, :invited_by_type
  	remove_column :researchers, :invitations_count
  end
end
