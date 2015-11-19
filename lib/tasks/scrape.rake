namespace :scrape do
  desc "Goes through wennergren to find information"
  task :import_list => :environment do
    require 'mechanize'
    agent = Mechanize.new
    agent.get("http://www.wennergren.org/search/node/U.%20of%20Arizona%2C%20Tucson%2C%20AZ")
    agent.page.links_with(:href => /node/).each do |link|
      link.click
      agent.page.links_with(:href => /grantees/).each do |link|
        person = link.click
        name = person.search("/html/body//div[@id='content-header']/h1[@class='title']")
        bio = person.search("/html/body//div[@class='content']/p")
        Person.create!(:Name => name.text.strip, :bio => bio.text.strip)
      end
    end
  end
end
