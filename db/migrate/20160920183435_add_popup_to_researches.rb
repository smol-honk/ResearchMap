class AddPopupToResearches < ActiveRecord::Migration
  def change
    add_column :researches, :popup, :text
  end
end
