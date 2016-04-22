class AddKeywordsToResearch < ActiveRecord::Migration
  def change
    add_column :researches, :keywords, :string
  end
end
