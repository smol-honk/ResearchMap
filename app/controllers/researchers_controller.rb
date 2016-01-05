class ResearchersController < ApplicationController
  def index
    @researchers = Researcher.all
  end

  def show
    @researcher = Researcher.find(params[:id])
    @researches = Research.where(researcher_id:@researcher.id)
    @followers = @researcher.followers(User).count + @researcher.followers(Researcher).count
    @following = @researcher.followees(Researcher).count
    @activities = PublicActivity::Activity.order("created_at desc").where(owner_id: @researcher)
    @likes = @researcher.likees(Researcher)

  end
end
