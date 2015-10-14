class WelcomeController < ApplicationController
  before_filter :set_people, only: [:map]
  def index
    @search = Person.search(params[:q])
    @people = @search.result
    @search.build_condition
  end
  
  def map
    @geojson = []
    
    @people.each do |person|
      @geojson << {
        type: 'Feature',
        geometry: {
          coordinates: [person.longitude, person.latitude],
          type: 'Point',
        },
        properties: {
          id: person.id,
          name: person.Name,
          bio: person.bio,
          title: person.title,
          donor: person.donor,
          active: person.active,
          location: person.Location,
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
  
  def set_people
    @people = Person.all
  end
end
