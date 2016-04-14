class AddNameHashToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :name_hash, :string
  end
end
