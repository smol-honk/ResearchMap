class TripPass < ActiveRecord::Base
  belongs_to :user
  belongs_to :researcher
  belongs_to :research
  before_create :setDays

  geocoded_by :location
  after_validation :geocode

  def setDays
    totalDays = user.days - (self.dateEnd - self.dateStart)
    if totalDays < 0
      return false
    else
      user.update_attribute(:days, totalDays)
    end
  end

  def decline
      self.update_attribute(:researcher_declined, true)
      self.update_attribute(:researcher_accept, false)
  end

  def accepted_cancel
    self.update_attribute(:researcher_declined, false)
    self.update_attribute(:researcher_accept, true)
  end

  def declined_cancel
    self.update_attribute(:researcher_declined, false)
    self.update_attribute(:researcher_accept, false)
  end

  def accept
    self.update_attribute(:researcher_accept, true)
    self.update_attribute(:researcher_declined, false)
  end

end
