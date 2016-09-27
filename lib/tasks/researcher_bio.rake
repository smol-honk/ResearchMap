namespace :researcher_bio do
	task scrape: :environment do
		mechanize = Mechanize.new
		page = mechanize.get('http://anthropology.arizona.edu/peo-directory')
		researchers = ['austin', 'fogelin', 'killick']

		for i in researchers
			link = nil
			while link.nil?
				link = page.link_with(href: /#{i}/)
				if link.nil?
					puts 'link was nil'
					page = page.link_with(text: /next/).click
				else
					puts 'found researcher'
					researcher = link.click
					bio = researcher.at('.field-item').text.strip
					puts bio
					email = researcher.at('.views-field-field-public-email a').text.strip
					email = email.split("@").first
					puts email
				end
			end
		end

	end
end
