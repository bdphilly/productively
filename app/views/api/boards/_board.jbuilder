json.extract! board, :id, :title, :user_id, :created_at, :updated_at
json.lists board.lists.sort_by(&:rank), partial: 'api/lists/list', as: :list