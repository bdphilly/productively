class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.integer :rank, null: false
      t.integer :board_id, null: false

      t.timestamps
    end
    change_column :boards, :title, :string, :null => false
    rename_column :users, :password, :password_digest
    change_column :users, :password_digest, :string, :null => false
    change_column :users, :username, :string, :null => false
  end
end
