class AddFailedAttemptsToResearcher < ActiveRecord::Migration
  def change
    add_column :researchers, :failed_attempts, :integer
  end
end
