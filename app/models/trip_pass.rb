class TripPass < ActiveRecord::Base
  belongs_to :user
  belongs_to :researcher
  belongs_to :research
  before_create :setDays

  geocoded_by :location
  after_validation :geocode

  def setDays
    totalDays = user.days - (self.dateEnd - self.dateStart)
    user.update_attribute(:days, totalDays)
  end

  def decline
      self.update_attribute(:researcher_declined, true)
  end

  def accept
    self.update_attribute(:researcher_accept, true)
  end
  
end
