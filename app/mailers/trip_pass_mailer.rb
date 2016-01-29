class TripPassMailer < ApplicationMailer
  def trip_request(trip_pass)
    @url = root_url
    @login = new_researcher_session_path
    @trip_pass = trip_pass
    mail(to: @trip_pass.researcher.email, subject: "A friend of Anthropology wants to visit you!")
  end
end
