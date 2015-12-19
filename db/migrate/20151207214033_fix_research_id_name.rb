class FixResearchIdName < ActiveRecord::Migration
  def change
    rename_column :researches_users, :researches_id, :research_id
  end
end
