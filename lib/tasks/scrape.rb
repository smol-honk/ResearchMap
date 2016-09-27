require 'mechanize'
require 'nokogiri'

researchers = ['austin', 'fogelin', 'killick']
# Researcher.all.map{ |r| researchers << r.last_name.strip}

def getBio(last_name)
	mechanize = Mechanize.new
	page = mechanize.get('http://anthropology.arizona.edu/peo-directory')
	link = nil
	while link.nil?
		link = page.link_with(href: /#{last_name}/)
		if link.nil?
			puts 'link was nil'
			page = page.link_with(text: /next/).click
		else
			puts 'found researcher'
			researcher = link.click
			bio = researcher.at('.field-item').text.strip
			puts bio
		end
	end
end

researchers.map{|r| getBio(r)}


