class LikesController < ApplicationController
  def index
    begin Researcher.find(params[:researcher_id])
      @current = Researcher.find(params[:researcher_id])
      @researches = @current.likees(Research)
    rescue StandardError
      @current = User.find(params[:user_id])
      @researches = @current.likees(Research)
    end
  end
end
