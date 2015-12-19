class CreateResearches < ActiveRecord::Migration
  def change
    create_table :researches do |t|
      t.string :name
      t.string :location
      t.text :abstract
      t.date :dateStart
      t.date :dateEnd
      t.float :lat
      t.float :lng

      t.timestamps null: false
    end
  end
end
