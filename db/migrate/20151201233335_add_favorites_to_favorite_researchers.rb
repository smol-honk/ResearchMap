class AddFavoritesToFavoriteResearchers < ActiveRecord::Migration
  def change
    add_column :favorite_researchers, :favorites, :integer
  end
end
