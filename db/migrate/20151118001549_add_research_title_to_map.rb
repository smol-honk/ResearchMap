class AddResearchTitleToMap < ActiveRecord::Migration
  def change
    add_column :people, :researchTitle, :string
  end
end
