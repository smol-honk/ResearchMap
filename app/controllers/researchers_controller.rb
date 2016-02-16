class ResearchersController < ApplicationController
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
    if user_signed_in? && current_user.admin?
      @researcher = Researcher.find(params[:id])
    else
      redirect_to root_path
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

  def your_research
    @researcher = current_researcher
    @researches = Research.where(researcher_id:@researcher.id)
  end
end
