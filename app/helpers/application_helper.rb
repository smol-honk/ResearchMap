module ApplicationHelper
  def link_to_add_fields(name, f, type)
     new_object = f.object.send "build_#{type}"
     id = "new_#{type}"
     fields = f.send("#{type}_fields", new_object, child_index: id) do |builder|
       render(type.to_s + "_fields", f: builder)
     end
     link_to(name, '#', class: "add_fields btn btn-default", data: {id: id, fields: fields.gsub("\n", "")})
   end

   def donor_bool(boolean)
     boolean ? 'Yes' : 'No'
   end

   def gravatar_for(user, title = user.first_name)
     if user.is_a?(Researcher)
       link_to (image_tag user.avatar.url(:thumb), size: '55', title: title, class: 'img-circle'), researcher_path(user.id)
     else
       link_to (image_tag user.avatar.url(:thumb), size: '55', title: title, class: 'img-circle'), user_path(user.id)
     end
   end
end
