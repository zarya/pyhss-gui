import http from "../http-common";

class TftApi {
  getAll() {
    return http.get("/tft/list");
  }

  get(id) {
    return http.get(`/tft/${id}`);
  }

  create(data) {
    return http.put("/tft/", data);
  }

  update(id, data) {
    return http.patch(`/tft/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tft/${id}`);
  }
}

export default new TftApi();
