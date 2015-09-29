class AddKeywordToPeople < ActiveRecord::Migration
  def change
    add_column :people, :keyword, :string
  end
end
