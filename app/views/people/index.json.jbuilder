json.array!(@people) do |person|
  json.extract! person, :id, :Name, :Location
  json.url person_url(person, format: :json)
end
