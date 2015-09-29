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
                  :id
  # Geocoder gem that takes in location and turns it into lat and long.                
  geocoded_by :Location
  after_validation :geocode, :if => :Location_changed?

  def self.ransackable_attributes(auth_object = nil)
    super - ['id', 'created_at', 'longitude', 'latitude', 'updated_at']
  end
end