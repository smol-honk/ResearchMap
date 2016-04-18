class AddDisciplineToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :discipline, :string
  end
end
