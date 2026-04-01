import HttpService from "./http.service";

class UserService extends HttpService {
    list = (params) => this.get("auth/users", params);

    create = (data) => this.post(`suppliers/job`, data);

    createOrder = (data) => this.post(`orderRequest`, data);

    assignDriver = (data) => this.post("suppliers/jobs/assignDriver", data);

    show = (id) => this.get(`suppliers/job/${id}`);

    update = (id, data) => this.put(`suppliers/job/${id}`, data);

    invoice = (data) => this.post(`downloadJobInvoice`, data);

    cancel = (data) => this.post(`cancelAppointment`, data);

    createExchange = (data) => this.post(`exchangeSkip`, data);

    requestCollection = (data) => this.post(`requestCollection`, data);

    addWaste = (id, data) => this.put(`suppliers/job/${id}/waste`, data);

    getWasteTypes = (params) => this.get(`suppliers/waste-types`, params);
}

export default new UserService();
