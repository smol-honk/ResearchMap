class DropTableResearchersFriends < ActiveRecord::Migration
  def change
    drop_table :researchers_friends
  end
end
