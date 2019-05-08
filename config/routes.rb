Rails.application.routes.draw do
  get 'shop/products'
  devise_for :users
  resources :users
  get 'site/index'
  get '/about' => 'about#about'
  get '/users/new' => 'deivse/registrations#new' 
  get '/signedinuserprofile' => 'users#signedinuserprofile'

  root 'site#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
