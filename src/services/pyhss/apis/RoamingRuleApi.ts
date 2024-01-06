import http from "../http-common";

class RoamingRuleApi {
  getAll() {
    return http.get("/roaming/rule/list");
  }

  get(id: number) {
    return http.get(`/roaming/rule/${id}`);
  }

  create(data: object) {
    return http.put("/roaming/rule/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/roaming/rule/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/roaming/rule/${id}`);
  }
}

export default new RoamingRuleApi();
