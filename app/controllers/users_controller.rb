class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:index, :edit, :destroy, :update, :import]
  def index
    if user_signed_in? && current_user.admin?
      @users = User.all
      respond_to do |format|
        format.html
        format.csv { send_data @users.to_csv }
        format.xls
      end
    else
      redirect_to root_url
    end
  end

  def edit
    if user_signed_in? && current_user.admin?
      @user = User.find(params[:id])
    else
      redirect_to root_path
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    # @research.create_activity :destroy, owner: current_researcher
    respond_to do |format|
      format.html { redirect_to users_path, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  def update
    @user = User.find(params[:id])
    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @user = User.find(params[:id])
    @following = @user.followees(Researcher).count
    @likes = @user.likees(Research).count
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

  def import
    if user_signed_in? && current_user.admin?
      User.import(params[:file])
      redirect_to :back, notice: "Users created/edited."
    else
      redirect_to :back
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :bio, :headline, :avatar, :avatar_cache, :remove_avatar, :role_id, :role)
  end

end
