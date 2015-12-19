class ActivityController < ApplicationController
  def index
    if user_signed_in?
      @activities = PublicActivity::Activity.order("created_at desc").where(owner_id: current_user.followees(Researcher))
    elsif researcher_signed_in?
      @activities = PublicActivity::Activity.order("created_at desc").where(owner_id: current_researcher.followees(Researcher))
    else
      redirect_to :back, alert: "You have to be logged in!"
    end
  end
end
