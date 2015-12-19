class RemoveColumnFromFavoriteResearchers < ActiveRecord::Migration
  def change
    remove_column :favorite_researchers, :user_id
  end
end
