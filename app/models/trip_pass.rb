class TripPass < ActiveRecord::Base
  belongs_to :user
  belongs_to :researcher
  belongs_to :research
  before_create :setDays

  def setDays
    totalDays = user.days - (self.dateEnd - self.dateStart)
    user.update_attribute(:days, totalDays)
  end

  geocoded_by :location
  after_validation :geocode
end
