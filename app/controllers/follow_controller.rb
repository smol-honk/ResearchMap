class FollowController < ApplicationController
  def followers
    @followee = Researcher.find(params[:researcher_id])
    @followers = @followee.followers(User) + @followee.followers(Researcher)
  end

  def following
    begin Researcher.find(params[:researcher_id])
      @followee = Researcher.find(params[:researcher_id])
      @followings = @followee.followees(User) + @followee.followees(Researcher)
    rescue StandardError
      @followee = User.find(params[:user_id])
      @followings = @followee.followees(User) + @followee.followees(Researcher)
    end
  end
end
