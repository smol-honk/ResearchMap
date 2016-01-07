class AddBioToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :bio, :text
  end
end
