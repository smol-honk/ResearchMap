require 'csv'
class User < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_follower
  belongs_to :role
  has_many :researchers
  has_many :researches
  before_save :assign_role
  before_save :name
  belongs_to :trip_pass
  validates_presence_of :first_name, :last_name

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :first_name, :title, :current_location, :last_name, :email, :password, :password_confirmation, :type, :bio, :role, :role_id, :days, :headline, :avatar, :avatar_cache, :remove_avatar

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = find_by_id(row["id"]) || new
      user.attributes = row.to_hash.slice(*accessible_attributes)
      if user.role_id == 3
        user.update_attribute :days, 7
      elsif user.role_id == 2
        user.update_attribute :days, 1
      end
      user.save!
    end
  end

  def name
    if self.first_name.nil? && !self.last_name.nil?
      self.name = self.last_name
    elsif !self.first_name.nil? && self.last_name.nil?
      self.name = self.first_name
    elsif self.first_name.nil? && self.last_name.nil?
      self.name = ""
    else
      self.name = self.first_name + " " +  self.last_name
    end
  end

  def admin?
    self.role.name == "Admin"
  end

  def patron?
    self.role.name == "Patron"
  end

  def benefactor?
    self.role.name == "Benefactor"
  end

  def assign_patron
    self.update_attribute :role_id, 2
    self.update_attribute :days, 1
  end

  def assign_benefactor
    self.update_attribute :role_id, 3
    self.update_attribute :days, 7
  end

  def assign_admin
    self.update_attribute :role_id, 4
  end

  def assign_role
    self.role = Role.find_by name: "Regular" if self.role.nil?
  end

  def mailboxer_email(object)
    return self.email
  end
end
