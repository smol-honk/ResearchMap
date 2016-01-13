# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
r1 = Role.create({name: "Regular", description: "Can follow and message Researchers and like Research"})
r2 = Role.create({name: "Patron", description: "Regular user plus can visit a Researcher for one day"})
r3 = Role.create({name: "Benefactor", description: "Regular user plus can visit a Researcher for up to 7 days"})
r4 = Role.create({name: "Admin", description: "Can perform any CRUD operation on any resource"})
