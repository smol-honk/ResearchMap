class AddUnconfirmedEmailToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :unconfirmed_email, :string
  end
end
