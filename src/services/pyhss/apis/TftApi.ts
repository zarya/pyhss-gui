import http from "../http-common";

class TftApi {
  getAll() {
    return http.get("/tft/list");
  }

  get(id: number) {
    return http.get(`/tft/${id}`);
  }

  create(data: object) {
    return http.put("/tft/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/tft/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/tft/${id}`);
  }
}

export default new TftApi();
