require 'test_helper'

class TripPassesControllerTest < ActionController::TestCase
  setup do
    @trip_pass = trip_passes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:trip_passes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create trip_pass" do
    assert_difference('TripPass.count') do
      post :create, trip_pass: { dateEnd: @trip_pass.dateEnd, dateStart: @trip_pass.dateStart, latitude: @trip_pass.latitude, location: @trip_pass.location, longitude: @trip_pass.longitude, researcher_id: @trip_pass.researcher_id, user_id: @trip_pass.user_id }
    end

    assert_redirected_to trip_pass_path(assigns(:trip_pass))
  end

  test "should show trip_pass" do
    get :show, id: @trip_pass
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @trip_pass
    assert_response :success
  end

  test "should update trip_pass" do
    patch :update, id: @trip_pass, trip_pass: { dateEnd: @trip_pass.dateEnd, dateStart: @trip_pass.dateStart, latitude: @trip_pass.latitude, location: @trip_pass.location, longitude: @trip_pass.longitude, researcher_id: @trip_pass.researcher_id, user_id: @trip_pass.user_id }
    assert_redirected_to trip_pass_path(assigns(:trip_pass))
  end

  test "should destroy trip_pass" do
    assert_difference('TripPass.count', -1) do
      delete :destroy, id: @trip_pass
    end

    assert_redirected_to trip_passes_path
  end
end
