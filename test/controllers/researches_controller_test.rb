require 'test_helper'

class ResearchesControllerTest < ActionController::TestCase
  setup do
    @research = researches(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:researches)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create research" do
    assert_difference('Research.count') do
      post :create, research: { abstract: @research.abstract, dateEnd: @research.dateEnd, dateStart: @research.dateStart, lat: @research.lat, lng: @research.lng, location: @research.location, name: @research.name }
    end

    assert_redirected_to research_path(assigns(:research))
  end

  test "should show research" do
    get :show, id: @research
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @research
    assert_response :success
  end

  test "should update research" do
    patch :update, id: @research, research: { abstract: @research.abstract, dateEnd: @research.dateEnd, dateStart: @research.dateStart, lat: @research.lat, lng: @research.lng, location: @research.location, name: @research.name }
    assert_redirected_to research_path(assigns(:research))
  end

  test "should destroy research" do
    assert_difference('Research.count', -1) do
      delete :destroy, id: @research
    end

    assert_redirected_to researches_path
  end
end
