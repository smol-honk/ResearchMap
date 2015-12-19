class AddResearcherToResearch < ActiveRecord::Migration
  def change
    add_reference :researches, :researcher, index: true, foreign_key: true
  end
end
