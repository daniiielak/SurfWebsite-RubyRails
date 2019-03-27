json.extract! user, :id, :email, :password, :firstname, :lastname, :address, :created_at, :updated_at
json.url user_url(user, format: :json)
