import HttpService from "./http.service";

class HomeService extends HttpService {
  getBanners = () => this.get("banner/list-banner");
  getCategories = (restaurant_id, language_id) => this.get(`category/allRestaurantCategories/${restaurant_id}/${language_id}`);
  getProducts = (category_id, language_id, status) => this.get(`product/products-list?category_id=${category_id}&language_id=${language_id}&status=${status}`);
  getAllCategoriesProducts = (params) => this.post(`product/all-categories-products-list`,params);
  getCartItems = (order_id, language_id, status) => this.get(`product/products-list?order_id=${order_id}&language_id=${language_id}&status=${status}`);
  getLanguages = () => this.getLang("getAllLanguageDetails");
  getAllKeysWords = () => this.get("keyword/fetchAllKeywordDetails");
  getLangDetail = (params) => this.post(`keyword/getDetailsOfKeywordByLangId`,params);

  
}

export default new HomeService();