class AddHeadLineToResearchers < ActiveRecord::Migration
  def change
    add_column :researchers, :headline, :string
  end
end
