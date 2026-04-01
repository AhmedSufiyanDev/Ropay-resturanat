import HttpService from "./http.service";

class BranchService extends HttpService {
    list = (params) => this.getRestaurant("restaurantBranch/list-restuarants-branch", params);
}

export default new BranchService();