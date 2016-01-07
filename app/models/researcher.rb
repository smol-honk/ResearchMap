class Researcher < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  has_and_belongs_to_many :users
  has_and_belongs_to_many :researchers
  has_many :researches, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_followable
  acts_as_follower

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  geocoded_by :current_location
  after_validation :geocode, :if => :current_location_changed?
  # Setup accessible (or protected) attributes for your model
  attr_accessible :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation

  def mailboxer_email(object)
    return self.email
  end

end
