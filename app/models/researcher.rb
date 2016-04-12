class Researcher < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_followable
  acts_as_follower
  belongs_to :users
  belongs_to :researchers
  belongs_to :trip_pass
  has_many :researches, dependent: :destroy
  before_create :name
  validates_presence_of :first_name, :last_name


  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation

  geocoded_by :current_location
  after_validation :geocode, :if => :current_location_changed?

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      researcher = find_by_id(row["id"]) || new
      researcher.attributes = row.to_hash.slice(*accessible_attributes)
      researcher.save!(validate: false)
    end
  end

  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |researcher|
        csv << researcher.attributes.values_at(*column_names)
      end
    end
  end

  def name
    self.name = self.first_name + " " + self.last_name
  end

  def mailboxer_email(object)
    return self.email
  end

end
