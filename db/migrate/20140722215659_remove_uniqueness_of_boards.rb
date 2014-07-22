class RemoveUniquenessOfBoards < ActiveRecord::Migration
  def change
  end
  remove_index :boards, :title
end
