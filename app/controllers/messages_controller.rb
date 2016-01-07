class MessagesController < ApplicationController
  before_action :get_user
  before_action :authenticate_user!, unless: :authenticate_researcher!
  def new

  end

  def create
    recipients = User.where(email: params['recipients']) + Researcher.where(email: params['recipients'])
    conversation = @current.send_message(recipients, params[:message][:body], params[:message][:subject]).conversation
    flash[:success] = "Message has been sent!"
    redirect_to conversation_path(conversation)
  end

  private
  def get_user
    if researcher_signed_in?
      @current = current_researcher
    else
      @current = current_user
    end
  end

end
