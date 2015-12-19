class AddFavoritedByToFavoriteResearchers < ActiveRecord::Migration
  def change
    add_column :favorite_researchers, :favorited_by, :integer
  end
end
