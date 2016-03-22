class AddResearcherConfirmable < ActiveRecord::Migration
  def change
    add_column :researchers, :confirmation_token, :string
    add_column :researchers, :confirmed_at, :datetime
    add_column :researchers, :confirmation_sent_at, :datetime
    # add_column :researchers, :unconfirmed_email, :string # Only if using reconfirmable
    add_index :researchers, :confirmation_token, :unique => true

    Researcher.update_all({:confirmed_at => DateTime.now, :confirmation_sent_at => DateTime.now})
  end
end
