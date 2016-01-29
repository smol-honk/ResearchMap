module TripPassesHelper
  def researcher_options
    s = ''
    Researcher.all.each do |researcher|
      s << "<option value='#{researcher.id}'>#{researcher.first_name} #{researcher.last_name}</option>"
    end
    s.html_safe
  end
end
