class AddLockedToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :locked_at, :date
  end
end
