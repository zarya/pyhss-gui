import http from "../http-common";

class ImsSubscriberApi {
  getAll() {
    return http.get("/ims_subscriber/list");
  }

  get(id) {
    return http.get(`/ims_subscriber/${id}`);
  }

  create(data) {
    return http.post("/ims_subscriber", data);
  }

  update(id, data) {
    return http.patch(`/ims_subscriber/${id}`, data);
  }

  delete(id) {
    return http.delete(`/ims_subscriber/${id}`);
  }
  findByImsi(id) {
    return http.get(`/ims_subscriber/ims_subscriber_imsi/${id}`);
  }
  findByMsisdn(id) {
    return http.get(`/ims_subscriber/ims_subscriber_msisdn/${id}`);
  }
}

export default new ImsSubscriberApi();
