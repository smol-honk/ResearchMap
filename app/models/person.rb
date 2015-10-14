class Person < ActiveRecord::Base
  # These attributes are what will accessible throughout the website. If the attribute is not listed here, it cannot work with the website.
  attr_accessible :Name,
                  :Location,
                  :latitude,
                  :longitude,
                  :bio,
                  :title,
                  :donor,
                  :dateStart,
                  :dateEnd,
                  :keyword,
                  :id,
                  :activeDateStart,
                  :activeDateEnd,
                  :active
  # Geocoder gem that takes in location and turns it into lat and long.                
  geocoded_by :Location
  after_validation :geocode, :if => :Location_changed?

  def active?
    self.activeDateEnd > Time.now.localtime
  end
  
  def inField?
    self.dateEnd > Time.now.localtime
  end
  
  def update_active_status
    if self.active?
      self.update_attribute(:active, true)
    else
      self.update_attribute(:active, false)
    end
  end
  
  def update_donor_status
    if self.inField?
      self.update_attribute(:donor, true)
    else
      self.update_attribute(:donor, false)
    end
  end
  
  def self.ransackable_attributes(auth_object = nil)
    super - ['id', 'created_at', 'longitude', 'latitude', 'updated_at']
  end
end