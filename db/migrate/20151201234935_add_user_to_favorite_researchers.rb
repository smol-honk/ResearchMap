class AddUserToFavoriteResearchers < ActiveRecord::Migration
  def change
    add_reference :favorite_researchers, :user, index: true, foreign_key: true
  end
end
