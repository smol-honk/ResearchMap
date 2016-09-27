class AddUsernameToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :username, :string
  end
end
