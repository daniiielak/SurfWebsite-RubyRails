require 'test_helper'

class ShopControllerTest < ActionDispatch::IntegrationTest
  test "should get products" do
    get shop_products_url
    assert_response :success
  end

end
