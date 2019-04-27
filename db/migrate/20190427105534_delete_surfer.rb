class DeleteSurfer < ActiveRecord::Migration[5.2]
 def up
    drop_table :surfers
  end
  
  def down
    fail ActiveRecord::IrreversibleMigration
end

end
