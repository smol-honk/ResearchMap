Rails.application.routes.draw do

  devise_for :users, :researchers
  resources :users, :researchers, :researches

  resources :users do
    get 'following', to: 'follow#following'
  end

  resources :researches do
    post 'like', to: 'socializations#like'
    post 'unlike', to: 'socializations#unlike'
  end

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :restore
      post :reply
    end
    collection do
      delete :empty_trash
    end
    member do
      post :mark_as_read
    end
  end

  resources :messages, only: [:new, :create]

  resources :researchers do
    post 'follow',   to: 'socializations#follow'
    post 'unfollow', to: 'socializations#unfollow'
    get 'following', to: 'follow#following'
    get 'followers', to: 'follow#followers'
  end

  resources :people do
    collection do
      get :search
    end
  end
  get 'my_research', to: 'researchers#yourResearch', as: :my_research
  get 'likes', to: 'likes#index', as: :likes
  get 'activity', to: 'activity#index', as: :activity
  get 'welcome/map'
  # get 'profile/:id' => 'profile#show', as: :profile
  get 'welcome/index'
  get 'welcome/data', :defaults => { format: :'json'}
  get 'people/index'
  root 'welcome#index'

end
