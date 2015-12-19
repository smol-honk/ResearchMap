class RenameFavoriteResearchersToFavorite < ActiveRecord::Migration
  def change
    rename_table :favorite_researchers, :favorites
  end
end
