class ConversationsController < ApplicationController
  before_action :authenticate!
  before_action :get_user
  before_action :get_mailbox
  before_action :get_conversation, except: [:index]
  before_action :get_box, only: [:index]
  def index
    @conversations = @mailbox.inbox
    if @box.eql? "inbox"
      @conversations = @mailbox.inbox
    elsif @box.eql? "sent"
      @conversations = @mailbox.sentbox
    else
      @conversations = @mailbox.trash
    end
  end

  def show
    @convo = @conversation.receipts_for(@current)
    respond_to do |format|
      format.html # show.html.haml
      format.json { render json: @convo.map{|u| u.message.as_json(include: { sender: { only: [:name, :avatar] } })}}
    end
  end

  def info
  end

  def reply
    @current.reply_to_conversation(@conversation, params[:body])
    respond_to do |format|
      format.js {render :nothing => true}
    end
  end

  def destroy
    @conversation.move_to_trash(@current)
    flash[:success] = 'Conversation moved to trash'
    redirect_to conversations_path
  end

  def restore
    if user_signed_in?
      @conversation.untrash(current_researcher)
      flash[:success] = 'Conversation restored'
      redirect_to conversations_path
    else
      @conversation.untrash(current_researcher)
      flash[:success] = 'Conversation restored'
      redirect_to conversations_path
    end
  end

  def mark_as_read
    @conversation.mark_as_read(@current)
    flash[:success] = 'The conversation was marked as read.'
    redirect_to conversations_path
  end

  def empty_trash
    @mailbox.trash.each do |conversation|
      conversation.receipts_for(@current).update_all(deleted: true)
    end
    flash[:success] = 'Your trash was cleaned!'
    redirect_to conversations_path
  end


  private
  def get_user
    if researcher_signed_in?
      @current = current_researcher
    else
      @current = current_user
    end
  end

  def get_box
    if params[:box].blank? or !["inbox", "sent", "trash"].include?(params[:box])
      params[:box] = 'inbox'
    end
    @box = params[:box]
  end

  def get_conversation
    @conversation ||= @mailbox.conversations.find(params[:id]) if params[:id]
  end

  def get_mailbox
      @mailbox ||= @current.mailbox
  end
end
