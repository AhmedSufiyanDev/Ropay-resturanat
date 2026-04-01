import HttpService from "./http.service";

class DashboardService extends HttpService {
  list = (data) => this.gets("cons_report_data/group_list",data);

  create = (data) => this.post("suppliers/job", data);

  show = (data) => this.get("suppliers/dashboard", data);

  update = (data, params) => this.put("suppliers/job");
}

export default new DashboardService();
