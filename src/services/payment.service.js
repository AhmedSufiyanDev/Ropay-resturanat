import HttpService from "./http.service";

class PaymentService extends HttpService {
    paymentDetails = (params) => this.getOrderPaymentDetails("payment/listPaymentOfOrders", params);
    listPaymentGateways = () => this.getPaymentGateways("payment/retrievePaymentGatewayInfomation");
}

export default new PaymentService();