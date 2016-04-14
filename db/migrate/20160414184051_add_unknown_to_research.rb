class AddUnknownToResearch < ActiveRecord::Migration
  def change
    add_column :researches, :unknown, :boolean
  end
end
