class ModifyColumnsInUsers < ActiveRecord::Migration
  def self.up
    User.update_all({:confirmed_at => DateTime.now, :confirmation_sent_at => DateTime.now})
  end
end
