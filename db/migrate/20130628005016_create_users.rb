class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :provider, :uid, :name, :email
    end

    create_table :country_entries do |t|
      t.string :code
      t.integer :user_id
    end
  end

  def down
    drop_table :users
    drop_table :country_entries
  end
end
