class AddResearcherToFavoriteResearchers < ActiveRecord::Migration
  def change
    add_reference :favorite_researchers, :researcher, index: true, foreign_key: true
  end
end
