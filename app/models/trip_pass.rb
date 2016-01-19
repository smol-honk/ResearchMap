class TripPass < ActiveRecord::Base
  belongs_to :user
  belongs_to :researcher
end
