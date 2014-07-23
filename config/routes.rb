Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit] do
      resources :lists, only: [:index, :show, :create, :update, :destroy]
    end
    resources :lists, only: [:show, :update, :destroy] do
      resources :cards, only: [:create, :index, :destroy]
    end
  end


  root 'boards#index'

  resource :session
  resources :users
  # resources :boards do 
  #   resources :lists
  # end

  # resources :lists do 
  #   resources :cards
  # end
end
