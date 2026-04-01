import HttpService from "./http.service";

class RestaurantService extends HttpService {
  getRestaurants = () => this.get("restaurant/list-restuarants");
  updateOrderItem = (params) => this.put("order/updateDetailsByGuestorCustomer",params);
  createOrder = (params) => this.post("order/createOrder",params);
  updateOrder = (params) => this.put("order/updateDetailsByGuestorCustomer",params);
  createOrderForPayment = (params) => this.post("order/createOrderForPayment",params);
  getPopularProducts = (params) => this.get("product/popular-product-list",params);
  getRestaurantByDomain = (data) => this.postRestaurant(`restaurant/get-restuarant-by-domain`, data);
}

export default new RestaurantService();
