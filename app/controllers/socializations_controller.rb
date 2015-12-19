# socializations_controller.rb
class SocializationsController < ApplicationController
  before_filter :load_socializable

  def follow
    if user_signed_in?
      current_user.follow!(@socializable)
      # render json: { follow: true }
      redirect_to @socializable, notice: "You have followed #{@socializable.email}"
    elsif researcher_signed_in?
      current_researcher.follow!(@socializable)
      redirect_to @socializable, notice: "You have followed #{@socializable.email}"
      # render json: { follow: true }
    else
      redirect_to :new_user_session, alert: "You need to be logged in to do that!"
    end
  end

  def unfollow
    if user_signed_in?
      current_user.unfollow!(@socializable)
      redirect_to @socializable, notice: "You have unfollowed #{@socializable.email}"
      # render json: { follow: false }
    elsif researcher_signed_in?
      redirect_to @socializable, notice: "You have unfollowed #{@socializable.email}"
      current_researcher.unfollow!(@socializable)
      # render json: { follow: false }
    else
      redirect_to :new_user_session, alert: "You need to be logged in to do that!"
    end
  end

  def like
    if user_signed_in?
      current_user.like!(@socializable)
      redirect_to @socializable, notice: "You have liked #{@socializable.name}"
      # render json: { like: true }
    elsif researcher_signed_in?
      redirect_to @socializable, notice: "You have liked #{@socializable.name}"
      current_researcher.like!(@socializable)
      # render json: { like: true}
    else
      redirect_to :new_user_session, alert: "You need to be logged in to do that!"
    end
  end

  def unlike
    if user_signed_in?
      current_user.unlike!(@socializable)
      redirect_to @socializable, notice: "You have unliked #{@socializable.name}"
      # render json: { like: false }
    elsif researcher_signed_in?
      current_researcher.unlike!(@socializable)
      redirect_to @socializable, notice: "You have unlike #{@socializable.name}"
      # render json: { like: false }
    else
      redirect_to :new_user_session, alert: "You need to be logged in to do that!"
    end
  end

private
  def load_socializable
    @socializable =
      case
      when id = params[:research_id]
        Research.find(id)
      when id = params[:researcher_id]
        Researcher.find(id)
      else
        raise ArgumentError, "Unsupported socializable model, params: " +
                             params.keys.inspect
      end
    raise ActiveRecord::RecordNotFound unless @socializable
  end
end
