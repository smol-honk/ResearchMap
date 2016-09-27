require 'csv'
require 'roo'
require 'mechanize'
require 'nokogiri'

class Researcher < ActiveRecord::Base

  mount_uploader :avatar, AvatarUploader
  acts_as_messageable
  acts_as_liker
  acts_as_followable
  acts_as_follower
  belongs_to :users
  belongs_to :researchers
  belongs_to :trip_pass
  has_many :researches, dependent: :destroy
  validates_presence_of :first_name, :last_name
  after_create :email!, :name!, :getBio!
  after_save :gen_name_hash!
  geocoded_by :current_location
  after_validation :geocode, :if => :current_location_changed?


  devise :rememberable, :trackable, :cas_authenticatable
# , :database_authenticatable , :validatable, :confirmable, :registerable, , :recoverable, :invitable, :registerable, , :lockable

  # Setup accessible (or protected) attributes for your model
  # attr_accessible :discipline, :phone_number, :name_hash, :name, :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation

  def self.import(file)
    spreadsheet = Roo::Spreadsheet.open(file)
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      researcher = find_by_id(row["id"]) || new
      researcher.attributes = row
      researcher.save!
    end
  end

  def getBio!
    mechanize = Mechanize.new
    page = mechanize.get('http://anthropology.arizona.edu/peo-directory')
    last_name = self.last_name.downcase
    link = nil
    while link.nil?
      link = page.link_with(href: /#{last_name}/)
      if link.nil?
        puts 'link was nil'
        page = page.link_with(text: /next/).click
      else
        puts 'found researcher'
        researcher = link.click
        bio = researcher.at('.field-item').text.strip
        puts bio
        self.update_attribute(:bio, bio);
        puts self.bio
        # email = researcher.at('.views-field-field-public-email a').text.strip
        # email = email.split("@").first
        # puts email
      end
    end
  end

  # def self.open_spreadsheet(file)
  #   case File.extname(file.original_filename)
  #   when ".csv" then Csv.new(file.path, nil, :ignore)
  #   when ".xls" then Excel.new(file.path, nil, :ignore)
  #   when ".xlsx" then Excelx.new(file.path, nil, :ignore)
  #   else raise "Unknown file type: #{file.original_filename}"
  #   end
  # end

  # def self.import(file)
  #   raise 'error'
  #   CSV.foreach(file.path, headers: true) do |row|
  #     researcher = find_by_id(row["id"]) || new
  #     researcher.attributes = row.to_hash.slice(*accessible_attributes)
  #     inDatabase = Researcher.all.map{|u| u.email}.include? researcher.email
  #     if researcher.encrypted_password.blank? && !researcher.email.blank? && !inDatabase
  #       researcher.invite!
  #     else
  #       researcher.save!
  #     end
  #   end
  # end


  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |researcher|
        csv << researcher.attributes.values_at(*column_names)
      end
    end
  end

  # Sets the username for the researcher to allow for CAS authenticable
  def setUsername(username)!
    self.update_attribute(:username, username)
  end

  
  def email! 
    if self.email.empty? and !self.username.nil?
      self.email = self.username + "@email.arizona.edu"
    end
  end

  def name!
    if self.first_name.nil?
      self.first_name = ""
    else
      self.first_name = self.first_name.capitalize.strip
    end
    if self.last_name.nil?
      self.last_name = ""
    else
      self.last_name = self.last_name.capitalize.strip
    end
    self.name = self.first_name + " " +  self.last_name
  end

  def has_new_requests?
    new_requests = TripPass.where(researcher: self).where(researcher_accept: false).where(researcher_declined: false)
    if new_requests.blank?
      return false
    else
      return true     
    end
  end

  def mailboxer_email(object)
    return self.email
  end


  def gen_name_hash!
    if self.name_hash != Digest::MD5.hexdigest(self.name)
      self.update_attribute(:name_hash, Digest::MD5.hexdigest(self.name))
    end
  end

  private
  # Using a private method to encapsulate the permissible parameters is
  # just a good pattern since you'll be able to reuse the same permit
  # list between create and update. Also, you can specialize this method
  # with per-user checking of permissible attributes.
  def researcher_params
    params.require(:researcher).permit(:username, :discipline, :phone_number, :name_hash, :name, :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation)
  end

end
