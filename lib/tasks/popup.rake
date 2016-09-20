namespace :popup do
  desc "TODO"
  task update: :environment do
    @research = Research.all
    @research.map{|r| r.update_popup}
  end

end
