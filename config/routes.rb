Rails.application.routes.draw do
  get 'search', to: 'search#index'

  resources :trip_passes
  devise_for :users, :path_prefix => 'profile', :controllers => { :users_invitations => "devise/invitations" }
  devise_for :researchers, :path_prefix => 'profile', :controllers => { :researchers_invitations => "devise/invitations" }

  # resources :users, :researchers, :researches
  get '/researches/search', to: 'researches#search', via: :all

  resources :users do
    get 'following', to: 'follow#following'
    get 'likes', to: 'likes#index', as: :likes
    get 'trips', to: 'users#trips', as: :trips
    collection {post :import}
  end

  resources :researches do
    collection {post :import}
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
    collection {post :import}
    post 'follow',   to: 'socializations#follow'
    post 'unfollow', to: 'socializations#unfollow'
    get 'following', to: 'follow#following'
    get 'followers', to: 'follow#followers'
    get 'likes', to: 'likes#index', as: :likes
  end

  resources :trip_passes do
    collection {post :import}
    post 'accept', to: 'trip_passes#accept', as: :accept
    post 'decline', to: 'trip_passes#decline', as: :decline
    post 'accepted_cancel', to: 'trip_passes#accepted_cancel', as: :accepted_cancel
    post 'declined_cancel', to: 'trip_passes#declined_cancel', as: :declined_cancel
  end

  get 'sent_trips', to: 'users#sent_trips', as: :sent_trips
  get 'available', to: 'researchers#available_researchers', as: :available
  post 'decline_message', to: 'messages#modal_send', as: :modal_send
  get 'accepted_passes', to: 'trip_passes#getAcceptedPasses', as: :accepted_passes
  get 'declined_passes', to: 'trip_passes#getDeclinedPasses', as: :declined_passes
  get 'trip_requests' => 'trip_passes#trip_requests', as: :trip_requests
  get 'import', to: 'admins#import', as: :import
  get 'templates', to: 'admins#templates', as: :templates
  get 'my_research', to: 'researchers#your_research', as: :my_research
  get 'activity', to: 'activity#index', as: :activity
  get 'welcome/map'
  # get 'profile/:id' => 'profile#show', as: :profile
  get 'welcome/index'
  get 'welcome/data', :defaults => { format: :'json'}
  get 'people/index'
  root 'welcome#index'

end
