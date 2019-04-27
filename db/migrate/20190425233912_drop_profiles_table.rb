class DropProfilesTable < ActiveRecord::Migration[5.2]
  def up
    drop_table :profiles
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
