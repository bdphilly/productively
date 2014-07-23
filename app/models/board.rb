# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  user_id    :integer          not null
#

class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user
  has_many :board_memberships, inverse_of: :board
  has_many :lists, dependent: :destroy
  has_many :cards, through: :lists
  
  has_many :members,
    through: :board_memberships,
    source: :user,
    inverse_of: :boards

  def is_member?(user)
    return true if user.id == self.user_id
    board_membership.where(user_id: user.id).exists?
  end
end
