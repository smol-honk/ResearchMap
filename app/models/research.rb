class Research < ActiveRecord::Base
  self.table_name = "researches"
  include PublicActivity::Common
  acts_as_likeable
  belongs_to :researcher
  has_and_belongs_to_many :researchs

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

end
