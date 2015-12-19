json.array!(@researches) do |research|
  json.extract! research, :id, :name, :location, :abstract, :dateStart, :dateEnd, :lat, :lng
  json.url research_url(research, format: :json)
end
