require 'csv'
class Research < ActiveRecord::Base
  self.table_name = "researches"
  include PublicActivity::Common
  acts_as_likeable
  belongs_to :researcher
  has_many :trip_pass
  after_create :update_popup

  # attr_accessible
  # :name,
  # :headline,
  # :location,
  # :latitude,
  # :longitude,
  # :abstract,
  # :dateStart,
  # :dateEnd,
  # :inFieldStart,
  # :inFieldEnd,
  # :available,
  # :weekStart,
  # :weekEnd,
  # :researcher,
  # :researcher_id,
  # :id,
  # :unknown,
  # :keywords

  geocoded_by :location
  after_validation :geocode, :if => :location_changed?

  def update_popup
    self.update_attribute(:popup, getPopUpString(self));
  end

  def getPopUpString(research)
    s = "<h3 class=\"blue\">" + research.name.to_s + "</h3>" + "<p>" + "<h5 id = \"thin\" class=\"red\">"+research.location.to_s+"</h5><h5 class=\"blue\" id = \"thin\">"+research.researcher.name.to_s+"</h5>"
    if !research.headline.nil?
      s += research.headline.to_s + "<br>" + "<a class = \"btn btn-default\" href =\"researches/" + research.id.to_s + "\"> Read More</a>"
    end
    return s
  end

  def update_dates
    if !dateEnd.nil?
      if Time.now > dateEnd
        self.update_attribute(:available, false)
      end
    end
  end

  def self.import(file)
    CSV.foreach(file.path, headers: true, encoding:'iso-8859-1:utf-8') do |row|
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


  private
  # Using a private method to encapsulate the permissible parameters is
  # just a good pattern since you'll be able to reuse the same permit
  # list between create and update. Also, you can specialize this method
  # with per-user checking of permissible attributes.
  def research_params
    params.require(:research).permit(:name, :headline, :location, :latitude, :longitude, :abstract, :dateStart, :dateEnd, :inFieldStart,
    :inFieldEnd,
    :available,
    :weekStart,
    :weekEnd,
    :researcher,
    :researcher_id,
    :id,
    :unknown,
    :keywords)
  end
end
