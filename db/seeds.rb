# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Role.create!(name: :"Regular User", description: :"Able to browse Research and Researchers, can message Researchers, like Research and follow Researchers.")
Role.create!(name: :"Patron", description: :"All abilities of Regular User, but may request a Trip Pass of 1 day.")
Role.create!(name: :"Benefactor", description: :"All the abilities of a Regular User, but may request Trip Passes up to 7 days.")
Role.create!(name: :"Administrator", description: :"All abilities of a Regular User, but may import Users, Researchers, Research, Trip Passes and has administrative rights to manage Users, Researchers, Research and Trip Passes.")
