class CreateJoinTableForFriendsResearchers < ActiveRecord::Migration
  def change
    create_table :researchers_friends, id: false do |t|
      t.belongs_to :researcher
      t.belongs_to :friend
    end
  end
end
