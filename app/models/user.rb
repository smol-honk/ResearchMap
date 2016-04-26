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
  attr_accessible :name, :first_name, :title, :current_location, :last_name, :email, :password, :password_confirmation, :type, :bio, :role, :role_id, :days, :headline, :avatar, :avatar_cache, :remove_avatar, :phone_number

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = find_by_id(row["id"]) || new
      user.attributes = row.to_hash.slice(*accessible_attributes)
      if user.role_id == 3
        user.update_attribute :days, 7
      elsif user.role_id == 2
        user.update_attribute :days, 1
      end

      inDatabase = User.all.map{|u| u.email}.include? user.email
      if user.encrypted_password.blank? && !user.email.blank? && !inDatabase
        user.invite!
      else
        user.save!
      end
    end
  end

  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |user|
        csv << user.attributes.values_at(*column_names)
      end
    end
  end

  def name
    if self.first_name.nil?
      self.first_name = ""
    end
    if self.last_name.nil?
      self.last_name = ""
    end
    self.name = self.first_name + " " +  self.last_name
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

  def assign_regular
    self.update_attribute :role_id, 1
    self.update_attribute :days, 0
  end

  def mailboxer_email(object)
    return self.email
  end
end
