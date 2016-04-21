class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include PublicActivity::StoreController
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  before_filter :set_global_search_variable, :mail_count, :request_count

  def set_global_search_variable
    @researches = Research.all
    @search = Research.search(params[:q])
    @researches = @search.result
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :first_name, :last_name, :email, :password, :password_confirmation, :remember_me) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :email, :password, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:discipline, :name, :first_name, :last_name, :email, :password, :password_confirmation, :current_password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar) }
    # Only add some parameters
    devise_parameter_sanitizer.for(:accept_invitation).concat [:first_name, :last_name, :phone]
    # Override accepted parameters
    devise_parameter_sanitizer.for(:accept_invitation) do |u|
    u.permit(:first_name, :last_name, :phone_number, :password, :password_confirmation,
             :invitation_token)
    end
  end

  private

  def request_count
    if researcher_signed_in?
      @request_count = TripPass.where(researcher: current_researcher).where(researcher_accept: false).where(researcher_declined: false).count
    end
  end

  def mail_count
    if user_signed_in?
      @messages_count = current_user.mailbox.inbox({:read => false}).count
    elsif researcher_signed_in?
      @messages_count = current_researcher.mailbox.inbox({:read => false}).count
    else
    end
  end

  def authenticate!
    if user_signed_in?
      :authenticate_user!
    elsif researcher_signed_in?
      :authenticate_researcher!
    else
      redirect_to root_path
      flash[:alert] = 'You need to be logged in to do that!'
    end
  end
end
