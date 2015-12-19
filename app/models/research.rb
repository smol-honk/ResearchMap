class Research < ActiveRecord::Base
  include PublicActivity::Common
  acts_as_likeable
  belongs_to :researcher
  has_and_belongs_to_many :users

  attr_accessible :name,
                  :location,
                  :latitude,
                  :longitude,
                  :abstract,
                  :dateStart,
                  :dateEnd,
                  :id

  geocoded_by :location
  after_validation :geocode, :if => :location_changed?
end
