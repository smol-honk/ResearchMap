class WelcomeController < ApplicationController
  before_filter :set_people, only: [:map]
  
  def index; end
  
  def map
    @geojson = []
    
    @people.each do |person|
      @geojson << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [person.longitude, person.latitude]
        },
        properties: {
          id: person.id,
          name: person.Name,
          bio: person.bio,
          title: person.title,
          "marker-color": :"#00607d",
          "marker-symbol": :"circle",
          "marker-size": :"medium"
        }
      }
    end
  
    respond_to do |format|
      format.html
      format.json { render json: @geojson }
    end
  end
  
  def set_people
    @people = Person.all
  end
end
