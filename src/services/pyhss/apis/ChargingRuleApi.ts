import http from "../http-common";

class ChargingRuleApi {
  getAll() {
    return http.get("/charging_rule/list");
  }

  get(id: number) {
    return http.get(`/charging_rule/${id}`);
  }

  create(data: object) {
    return http.put("/charging_rule/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/charging_rule/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/charging_rule/${id}`);
  }
}

export default new ChargingRuleApi();
