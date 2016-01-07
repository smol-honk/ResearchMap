module MessagesHelper
  def recipients_options
    s = ''
    Researcher.all.each do |researcher|
      s << "<option value='#{researcher.email}'>#{researcher.first_name} #{researcher.last_name} (Researcher)</option>"
    end
    User.all.each do |user|
      s << "<option value='#{user.email}'>#{user.first_name} #{user.last_name} </option>"
    end
    s.html_safe
  end
end
