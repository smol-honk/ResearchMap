class ResearchersController < ApplicationController
  before_action :authenticate!, only: [:edit, :destroy, :update, :import]
  def available_researchers
    @researches = Research.where("available = true OR unknown = true")
    @researchers = @researches.map { |r| r.researcher }
  end

  def index
    @researchers = Researcher.all
    @search = Researcher.search(params[:q])
    @researchers = @search.result
    respond_to do |format|
      format.html
      format.csv { send_data @researchers.to_csv }
      format.xls
    end
  end
  def edit
    @researcher.discipline = params['discipline']
  end

  def update
    @researcher = Researcher.find(params[:id])
    if params[:researcher][:password].blank?
      params[:researcher].delete(:password)
      params[:researcher].delete(:password_confirmation)
    end
    respond_to do |format|
      if @researcher.update(researcher_params)
        format.html { redirect_to @researcher, notice: 'Researcher was successfully updated.' }
        format.json { render :show, status: :ok, location: @researcher }
      else
        format.html { render :edit }
        format.json { render json: @researcher.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    if user_signed_in? && current_user.admin?
      @researcher = Researcher.find(params[:id])
    else
      redirect_to root_path
    end
  end

  def create
    @researcher = Researcher.new(researcher_params)
    @researcher.email!
    @researcher.save!
    if @researcher.save
      respond_to do |format|
        format.html { redirect_to @researcher, notice: 'Researcher was successfully saved.' }
      end
    else
      respond_to do |format|
        format.html { redirect_to @researcher, alert: 'Researcher was not successfully saved.' }
      end
    end

  end

  def show
    @researcher = Researcher.find(params[:id])
    @researches = Research.where(researcher_id:@researcher.id)
    @followers = @researcher.followers(User).count + @researcher.followers(Researcher).count
    @following = @researcher.followees(Researcher).count
    @activities = PublicActivity::Activity.order("created_at desc").where(owner_id: @researcher)
    @likes = @researcher.likees(Research)
  end

  def import
    if user_signed_in? && current_user.admin?
      Researcher.import(params[:file])
      redirect_to :back, notice: "Researchers created/edited."
    else
      redirect_to :back
    end
  end

  def destroy
    @researcher = Researcher.find(params[:id])
    @researcher.destroy
    respond_to do |format|
      format.html { redirect_to researchers_path, notice: 'Researcher was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def your_research
    @researcher = current_researcher
    @researches = Research.where(researcher_id:@researcher.id)
  end

  def researcher_params
    params.require(:researcher).permit(:username, :discipline, :email, :password, :password_confirmation, :first_name, :last_name, :bio, :headline, {avatars: []}, :avatar_cache, :remove_avatar, :phone_number, :name, :current_location, :longitude, :latitude, :title, :available, :week, :day, :day_available, :weekDateStart, :weekDateEnd)
  end
end
