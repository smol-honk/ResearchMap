class SearchController < ApplicationController
  def index
    if !params[:q].nil?
      s = params[:q][:keywords_cont_any].gsub ",", ""
      s = s.split
      params[:q][:keywords_cont_any] = s
    end
    @q = Research.ransack(params[:q])
    @researches = @q.result
  end

  def search
    index
    render :index
  end

end
