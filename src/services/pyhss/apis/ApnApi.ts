import http from "../http-common";

class ApnApi {
  getAll() {
    return http.get("/apn/list");
  }

  get(id: number) {
    return http.get(`/apn/${id}`);
  }

  create(data: object) {
    return http.put("/apn/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/apn/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/apn/${id}`);
  }
}

export default new ApnApi();
