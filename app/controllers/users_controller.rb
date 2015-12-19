class UsersController < ApplicationController
  def index
    @users = User.all
    redirect_to :root
  end

  def show
    @user = User.find(params[:id]) or not_found
  end

  def likes
    if user_signed_in?
      @researches = current_user.likees(Research)
    elsif researcher_signed_in?
      @researches = current_researcher.likees(Research)
    else
      redirect_to :back, alert: "You have to be logged in!"
    end
  end

end
