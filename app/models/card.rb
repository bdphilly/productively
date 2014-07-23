# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :string(255)
#  rank        :integer          not null
#  list_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  validates :title, :rank, :list_id, presence: true

  belongs_to :list
  has_one :board, through: :list
  default_scope { order(:rank) }
end
