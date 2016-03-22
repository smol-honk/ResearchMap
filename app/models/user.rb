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
  before_create :name
  belongs_to :trip_pass
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :first_name, :last_name, :email, :password, :password_confirmation, :type, :bio, :role, :role_id, :days, :headline, :avatar, :avatar_cache, :remove_avatar
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
    super if confirmed?
  end

  def password_match?
    self.errors[:password] << "can't be blank" if password.blank?
    self.errors[:password_confirmation] << "can't be blank" if password_confirmation.blank?
    self.errors[:password_confirmation] << "does not match password" if password != password_confirmation
    password == password_confirmation && !password.blank?
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

  def mailboxer_email(object)
    return self.email
  end
end
