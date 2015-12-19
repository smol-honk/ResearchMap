class CreateFavoriteResearchers < ActiveRecord::Migration
  def change
    create_table :favorite_researchers do |t|
      t.integer :researcher_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
