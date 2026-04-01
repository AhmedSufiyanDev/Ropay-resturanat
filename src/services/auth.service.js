import HttpService from "./http.service";

class AuthService extends HttpService {
    login = (data) => this.postRestaurant("auth/login", data);

    signup = (data) => this.postRestaurant(`auth/signup-user`, data);

    logout = (data) => this.get("logout");

    sendOtp = (data) => this.post(`auth/login`,data);

    sendQuery = (data) => this.post(`public/auth/manageQueries`,data);

    verifyOtp = (data) => this.putRestaurant(`auth/verify-email`,data);
}

export default new AuthService();
