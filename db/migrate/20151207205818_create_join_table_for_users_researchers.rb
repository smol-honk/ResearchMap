class CreateJoinTableForUsersResearchers < ActiveRecord::Migration
  def change
    create_table :researchers_users, id: false do |t|
      t.belongs_to :researcher
      t.belongs_to :user
    end
  end
end
