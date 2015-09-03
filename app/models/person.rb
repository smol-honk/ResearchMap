class Person < ActiveRecord::Base
  attr_accessible :Name,
                  :Location,
                  :latitude,
                  :longitude,
                  :bio,
                  :title
                  
  geocoded_by :Location
  after_validation :geocode, :if => :Location_changed?
end

