class RemoveResearcherFromFavoriteResearcher < ActiveRecord::Migration
  def change
    remove_column :favorite_researchers, :researcher_id
  end
end
