import http from "../http-common";

class SubscriberApi {
  getAll() {
    return http.get("/subscriber/list");
  }

  get(id) {
    return http.get(`/subscriber/${id}`);
  }

  create(data) {
    return http.post("/subscriber", data);
  }

  update(id, data) {
    return http.patch(`/subscriber/${id}`, data);
  }

  delete(id) {
    return http.delete(`/subscriber/${id}`);
  }
  findByMsisdn(msisdn) {
    return http.get(`/subscriber/msisdn/${msisdn}`) 
  }
}

export default new SubscriberApi();
