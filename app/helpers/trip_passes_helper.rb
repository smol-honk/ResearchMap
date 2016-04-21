module TripPassesHelper
  def researcher_options
    s = ''
    Researcher.all.each do |researcher|
      s << "<option value='#{researcher.id}'>#{researcher.first_name} #{researcher.last_name}</option>"
    end
    s.html_safe
  end

  def user_options
    s = ''
    User.all.each do |user|
      s << "<option value='#{user.id}'>#{user.first_name} #{user.last_name}</option>"
    end
    s.html_safe
  end

  def research_options
    s = ''
    Research.where("unknown = true OR available = true").order(:researcher_id).each do |research|
      s << "<option value='#{research.id}'>#{research.name} in #{research.location} (#{research.researcher.name})</option>"
    end
    s.html_safe
  end
end
