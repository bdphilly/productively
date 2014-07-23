json.extract! list, :id, :title, :board_id, :created_at, :updated_at
json.cards list.cards.sort_by(&:rank)