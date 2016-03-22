class Researcher < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  belongs_to :users
  belongs_to :researchers
  belongs_to :trip_pass
  has_many :researches, dependent: :destroy
  before_create :name
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_followable
  acts_as_follower

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  geocoded_by :current_location
  after_validation :geocode, :if => :current_location_changed?
  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation
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

  # new function to set the password without knowing the current
  # password used in our confirmation controller.
  def attempt_set_password(params)
    p = {}
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    update_attributes(p)
  end

  # new function to return whether a password has been set
  def has_no_password?
    self.encrypted_password.blank?
  end

  # Devise::Models:unless_confirmed` method doesn't exist in Devise 2.0.0 anymore.
  # Instead you should use `pending_any_confirmation`.
  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  def password_required?
    # Password is required if it is being set, but not for new records
    if !persisted?
      false
    else
      !password.nil? || !password_confirmation.nil?
    end
  end

  def password_match?
    self.errors[:password] << "can't be blank" if password.blank?
    self.errors[:password_confirmation] << "can't be blank" if password_confirmation.blank?
    self.errors[:password_confirmation] << "does not match password" if password != password_confirmation
    password == password_confirmation && !password.blank?
  end

  def mailboxer_email(object)
    return self.email
  end

end
