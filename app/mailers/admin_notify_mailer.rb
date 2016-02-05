class AdminNotifyMailer < ApplicationMailer
  def accepted_trip_pass(trip_pass)
    @admin = User.find(32)
    @trip_pass = trip_pass
    mail(to: @admin.email, subject: "#{@trip_pass.researcher.name} has accepted #{@trip_pass.user.name}!")
  end
end
