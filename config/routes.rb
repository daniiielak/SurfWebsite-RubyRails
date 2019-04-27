Rails.application.routes.draw do
  devise_for :users
  resources :users
  get 'site/index'
  get '/about' => 'about#about'
  get '/users/new' => 'deivse/registrations#new' 

  root 'site#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
