class SearchController < ApplicationController
  def index
    @q = Research.ransack(params[:q])
    @researches = @q.result
  end

  def search
    index
    render :index
  end

end
