# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  token           :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
  before_validation :ensure_session_token

  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :token, presence: true, uniqueness: true
  validates :username, uniqueness: true

  has_many :boards
  has_many :board_memberships, inverse_of: :user

  # has_many :boards,
  #   through: :board_assignments,
  #   source: :board,
  #   inverse_of: :members

  def reset_token!
    self.token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  private
  
  def ensure_session_token
    self.token ||= SecureRandom::urlsafe_base64(16)
  end
end
