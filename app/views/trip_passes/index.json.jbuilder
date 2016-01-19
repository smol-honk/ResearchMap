json.array!(@trip_passes) do |trip_pass|
  json.extract! trip_pass, :id, :location, :longitude, :latitude, :dateStart, :dateEnd, :user_id, :researcher_id
  json.url trip_pass_url(trip_pass, format: :json)
end
