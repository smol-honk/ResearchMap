require 'csv'
class User < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_follower
  belongs_to :role
  has_and_belongs_to_many :researchers
  has_and_belongs_to_many :researches
  before_save :assign_role
  before_create :name
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :first_name, :last_name, :email, :password, :password_confirmation, :type, :bio, :role, :headline, :avatar, :avatar_cache, :remove_avatar
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      user = find_by_id(row["id"]) || new
      user.attributes = row.to_hash.slice(*accessible_attributes)
      user.save!(validate: false)
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
    self.name = self.first_name + " " +  self.last_name
  end

  def admin?
    self.role.name == "Admin"
  end

  def assign_role
    self.role = Role.find_by name: "Regular" if self.role.nil?
  end

  def is_admin?
    self.is_a?(Admin)
  end

  def is_friend?
    self.is_a?(Friend)
  end

  def mailboxer_email(object)
    return self.email
  end
end
