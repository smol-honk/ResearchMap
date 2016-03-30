class AdminNotifyMailer < ApplicationMailer
  def accepted_trip_pass(trip_pass)
    @admin = User.find(32)
    @trip_pass = trip_pass
    mail(to: @admin.email, subject: "#{@trip_pass.researcher.name} has accepted #{@trip_pass.user.name}'s Trip Request!")
  end

  def new_trip_pass(trip_pass)
    @admin = User.where(role: 4)
    @trip_pass = trip_pass
    @admin.each do |admin|
      mail(to: admin.email, subject: "#{@trip_pass.user.name} has sent #{@trip_pass.researcher.name} a Trip Request!")
    end
  end

  def unaccept_trip_pass(trip_pass)
    @admin = User.where(role: 4)
    @trip_pass = trip_pass
    @admin.each do |admin|
      mail(to: admin.email, subject: "#{@trip_pass.researcher.name} has declined #{@trip_pass.user.name}'s Trip Request!")
    end
  end

end
