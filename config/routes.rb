Rails.application.routes.draw do
  devise_for :users
  
  # Defines the root path route ("/")
  # root "posts#index"
  root 'home#index'

  namespace :api do
    resources :wishlists, only: [:create, :destroy]
  end

  resources :properties, only: [:show]
end
