class Researcher < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_messageable
  acts_as_mentioner
  acts_as_mentionable
  acts_as_liker
  acts_as_followable
  acts_as_follower
  has_and_belongs_to_many :users
  has_and_belongs_to_many :researchers
  has_many :researches, dependent: :destroy
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # Setup accessible (or protected) attributes for your model
  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation
end
