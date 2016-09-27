class AdminsController < ApplicationController
	before_action :authenticate_admin!
	
	def import
		User.import(params[:file])
		redirect_to root_url, notice: "Users created."
	end

	def templates
	end

	def addResearcher
		@researcher = Researcher.new
		# raise 'error'
		puts params
	end

	def create
		puts params

	end

	private
	def authenticate_admin!
		if user_signed_in? && current_user.admin?
		else
			redirect_to root_url, alert: "You don't have permission to do that!"
		end
	end


end
