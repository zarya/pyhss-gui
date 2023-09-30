import http from "../http-common";

class ChargingRuleApi {
  getAll() {
    return http.get("/charging_rule/list");
  }

  get(id) {
    return http.get(`/charging_rule/${id}`);
  }

  create(data) {
    return http.put("/charging_rule/", data);
  }

  update(id, data) {
    return http.patch(`/charging_rule/${id}`, data);
  }

  delete(id) {
    return http.delete(`/charging_rule/${id}`);
  }
}

export default new ChargingRuleApi();
