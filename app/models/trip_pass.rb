require 'csv'
class TripPass < ActiveRecord::Base
  belongs_to :user
  belongs_to :researcher
  belongs_to :research
  before_create :setDays

  geocoded_by :location
  after_validation :geocode

  def self.import(file)
    CSV.foreach(file.path, headers: true, encoding:'iso-8859-1:utf-8') do |row|
      trip_pass = find_by_id(row["id"]) || new
      trip_pass.attributes = row.to_hash.slice(*accessible_attributes)
      trip_pass.save!
    end
  end

  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |trip_pass|
        csv << trip_pass.attributes.values_at(*column_names)
      end
    end
  end

  def setDays
    totalDays = user.days - (self.dateEnd - self.dateStart)
    if totalDays < 0
      return false
    else
      user.update_attribute(:days, totalDays)
    end
  end

  def decline
      return_days = (self.dateEnd - self.dateStart) + user.days
      self.update_attribute(:researcher_declined, true)
      self.update_attribute(:researcher_accept, false)
      self.user.update_attribute(:days, return_days)
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
