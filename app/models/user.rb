# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string(255)
#  password   :string(255)
#  token      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class User < ActiveRecord::Base
	validates :username, :password, presence: true
	validates :password, length: { minimum: 6 }
	# validates :username, uniqueness: true

	def reset_token!
		self.token = SecureRandom::urlsafe_base64(16)
		self.save!
		self.token
	end
end
