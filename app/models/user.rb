class User < ActiveRecord::Base
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_follower
  has_and_belongs_to_many :researchers
  has_and_belongs_to_many :researches
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :first_name, :last_name, :email, :password, :password_confirmation, :type, :bio

  def is_admin?
    self.is_a?(Admin)
  end

  def is_friend?
    self.is_a?(Friend)
  end

end
