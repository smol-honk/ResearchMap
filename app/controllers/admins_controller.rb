class AdminsController < ApplicationController
  def import
    User.import(params[:file])
    redirect_to root_url, notice: "Users created."
  end

  def templates
  end

end
