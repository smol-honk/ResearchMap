class TripPassesController < ApplicationController
  before_action :set_trip_pass, only: [:show, :edit, :update, :destroy]
  before_action :authenticate!, :set_user
  before_action :hasDays, only: [:new]
  before_action :authenticate_researcher!, only: [:tripRequests]


  # GET /trip_passes
  # GET /trip_passes.json
  def index
    if @current.try(:admin?)
      @trip_passes = TripPass.all
    else
      redirect_to root_url
    end
  end

  def trip_requests
    if researcher_signed_in?
      @trip_passes = TripPass.where(researcher: current_researcher)
    else
      redirect_to root_url, alert: "You don't have access to this page!"
    end
  end

  # GET /trip_passes/1
  # GET /trip_passes/1.json
  def show
  end

  def accept
    @trip_pass = TripPass.find(params[:id])
    if @current == @trip_pass.researcher
      AdminNotifyMailer.accepted_trip_pass(@trip_pass).deliver_now
      @trip_pass.update_attribute(:researcher_accept, true)
      redirect_to trip_requests_path
    else
      redirect_to root_url, alert: "You don't have permission to approve this trip pass!"
    end
  end

  # GET /trip_passes/new
  def new
    @trip_pass = TripPass.new
  end

  # GET /trip_passes/1/edit
  def edit
  end

  # POST /trip_passes
  # POST /trip_passes.json
  def create
    @trip_pass = TripPass.new(trip_pass_params)
    @trip_pass.user = current_user
    @trip_pass.researcher_id = params['researcher']
    @trip_pass.research_id = params['research']
    @trip_pass.location = Research.find(params['research']).location

    respond_to do |format|
      if @trip_pass.save
        TripPassMailer.trip_request(@trip_pass).deliver_now
        format.html { redirect_to @trip_pass, notice: 'Trip pass was successfully created.' }
        format.json { render :show, status: :created, location: @trip_pass }
      else
        format.html { render :new }
        format.json { render json: @trip_pass.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trip_passes/1
  # PATCH/PUT /trip_passes/1.json
  def update
    respond_to do |format|
      if @trip_pass.update(trip_pass_params)
        format.html { redirect_to @trip_pass, notice: 'Trip pass was successfully updated.' }
        format.json { render :show, status: :ok, location: @trip_pass }
      else
        format.html { render :edit }
        format.json { render json: @trip_pass.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trip_passes/1
  # DELETE /trip_passes/1.json
  def destroy
    if @current.admin?
      @trip_pass.destroy
      respond_to do |format|
        format.html { redirect_to trip_passes_url, notice: 'Trip pass was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      redirect_to trip_passes_url, alert: 'Not authorized to destroy trip pass.'
    end
  end

  private

  def set_user
    if user_signed_in?
      @current = current_user
    elsif researcher_signed_in?
      @current = current_researcher
    else
      redirect_to root_url
    end
  end

  def hasDays
    if user_signed_in?
      if current_user.days > 0 || current_user.admin?
      else
        redirect_to root_url, alert: "You don't have any available days to visit a Researcher!"
      end
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_trip_pass
    @trip_pass = TripPass.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def trip_pass_params
    params.require(:trip_pass).permit(:location, :longitude, :latitude, :dateStart, :dateEnd, :user_id, :researcher_id, :research, :research_id)
  end
end
