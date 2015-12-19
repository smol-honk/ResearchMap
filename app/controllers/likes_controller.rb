class LikesController < ApplicationController
  def index
    if user_signed_in?
      like_count = current_user.likees(Research).count
      @researches = current_user.likees(Research)
    elsif researcher_signed_in?
      like_count = current_researcher.likees(Research).count
      @researches = current_researcher.likees(Research)
    else
      redirect_to :new_user_session, alert: "You need to be logged in to do that!"
    end
  end
end
