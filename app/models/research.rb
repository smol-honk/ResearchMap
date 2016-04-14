class Research < ActiveRecord::Base
  self.table_name = "researches"
  include PublicActivity::Common
  acts_as_likeable
  belongs_to :researcher
  has_many :trip_pass

  attr_accessible :name,
                  :headline,
                  :location,
                  :latitude,
                  :longitude,
                  :abstract,
                  :dateStart,
                  :dateEnd,
                  :inFieldStart,
                  :inFieldEnd,
                  :available,
                  :week,
                  :day,
                  :day_date,
                  :weekStart,
                  :weekEnd,
                  :researcher,
                  :researcher_id,
                  :id,
                  :unknown

  geocoded_by :location
  after_validation :geocode, :if => :location_changed?

  def update_dates
    if Time.now > dateEnd
      self.update_attribute(:available, false)
    end
  end

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      research = find_by_id(row["id"]) || new
      research.attributes = row.to_hash.slice(*accessible_attributes)
      research.save!
    end
  end

  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |research|
        csv << research.attributes.values_at(*column_names)
      end
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    super - ['id', 'created_at', 'longitude', 'latitude', 'updated_at']
  end
end
