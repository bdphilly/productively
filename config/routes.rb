Rails.application.routes.draw do

  root to: 'boards#index'

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit] do
      resources :lists, only: [:index, :show, :create, :update, :destroy]
    end
    resources :lists, only: [:show, :update, :destroy] do
      resources :cards, only: [:create, :index, :destroy]
    end
  end

  

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]

  resources :boards do 
    resources :lists
  end

  resources :lists do 
    resources :cards
  end
end
