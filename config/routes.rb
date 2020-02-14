Rails.application.routes.draw do
  root "tops#index"

  resources :tops, only: [:index]
  resources :items_sell, only: [:index]
  resources :item_informations, only: [:index]
  resources :users, only: [:index] do
    collection do
      get 'tel'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
