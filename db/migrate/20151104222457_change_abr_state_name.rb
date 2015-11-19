class ChangeAbrStateName < ActiveRecord::Migration
  def change
    rename_column :people, :abr_State, :full_State
  end
end
