Rails.application.routes.draw do
  get 'rake/routes'

  root 'boards#index'

  resource :session
  resources :users
  resources :boards do 
    resources :lists
  end
end
