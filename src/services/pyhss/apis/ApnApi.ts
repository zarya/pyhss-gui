import http from "../http-common";

class ApnApi {
  getAll() {
    return http.get("/apn/list");
  }

  get(id) {
    return http.get(`/apn/${id}`);
  }

  create(data) {
    return http.put("/apn/", data);
  }

  update(id, data) {
    return http.patch(`/apn/${id}`, data);
  }

  delete(id) {
    return http.delete(`/apn/${id}`);
  }
}

export default new ApnApi();
