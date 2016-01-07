class ResearchesController < ApplicationController
  before_action :set_research, only: [:show, :edit, :update, :destroy]

  # GET /researches
  # GET /researches.json
  def index
    @researches = Research.all
    @search = Research.search(params[:q])
    @researches = @search.result
  end

  # GET /researches/1
  # GET /researches/1.json
  def show
    @search = Research.search(params[:q]) or not_found
    @people = @search.result
  end

  # GET /researches/new
  def new
    if researcher_signed_in? or current_user.try(:admin?)
      @research = Research.new
    else
      redirect_to :back, alert: "You are not authorized to create a new research"
    end
  end

  # GET /researches/1/edit
  def edit
    if researcher_signed_in? and @research.researcher == current_researcher
    elsif current_user.try(:admin?)
    else
      redirect_to :back, alert: "You are not authorized to edit this Research"
    end
  end

  # POST /researches
  # POST /researches.json
  def create
    @research = Research.new(research_params)
    @research.researcher = current_researcher

    respond_to do |format|
      if @research.save
        @research.create_activity :create, owner: current_researcher
        format.html { redirect_to @research, notice: 'Research was successfully created.' }
        format.json { render :show, status: :created, location: @research }
      else
        format.html { render :new }
        format.json { render json: @research.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /researches/1
  # PATCH/PUT /researches/1.json
  def update
    respond_to do |format|
      if @research.update(research_params)
        format.html { redirect_to @research, notice: 'Research was successfully updated.' }
        format.json { render :show, status: :ok, location: @research }
      else
        format.html { render :edit }
        format.json { render json: @research.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /researches/1
  # DELETE /researches/1.json
  def destroy
    @research.destroy
    # @research.create_activity :destroy, owner: current_researcher
    respond_to do |format|
      format.html { redirect_to researches_url, notice: 'Research was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_research
      @research = Research.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def research_params
      params.require(:research).permit(:name, :location, :abstract, :dateStart, :dateEnd, :latitude, :longitude, :researcher_id)
    end
end
