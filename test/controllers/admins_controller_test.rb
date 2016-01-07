require 'test_helper'

class AdminsControllerTest < ActionController::TestCase
  test "should get portal" do
    get :portal
    assert_response :success
  end

end
