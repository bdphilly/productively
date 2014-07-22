class Card < ActiveRecord::Base
  validates :title, :rank, :list_id, presence: true

  belongs_to :list
  has_one :board, through: :list
end
