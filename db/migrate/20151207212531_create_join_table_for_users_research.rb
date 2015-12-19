class CreateJoinTableForUsersResearch < ActiveRecord::Migration
  def change
    create_table :researches_users, id: false do |t|
      t.belongs_to :researches
      t.belongs_to :user
    end
  end
end
