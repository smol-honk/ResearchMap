class WelcomeController < ApplicationController
  before_filter :set_researches, only: [:map]

  def index

  end

  def map
    @geojson = []

    @researches.each do |research|
      @geojson << {
        type: 'Feature',
        geometry: {
          coordinates: [research.longitude, research.latitude],
          type: 'Point',
        },
        properties: {
          id: research.id,
          name: research.name,
          researcher: research.researcher.name,
          bio: research.headline,
          location: research.location,
          available: research.available,
          unknown: research.unknown,
          "marker-color": :"#00607d",
          "marker-size": :"medium",
          "marker-symbol": :"pitch"

        }
      }
    end

    respond_to do |format|
      format.html
      format.json { render json: @geojson }
    end
  end

  def set_researches
    @researches = Research.all
  end
end
