class AddAvatarToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :avatar, :string
  end
end
