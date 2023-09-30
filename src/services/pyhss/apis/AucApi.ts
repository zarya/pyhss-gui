import http from "../http-common";

class AucApi {
  getAll() {
    return http.get("/auc/list");
  }

  get(id) {
    return http.get(`/auc/${id}`);
  }

  create(data) {
    return http.put("/auc/", data);
  }

  update(id, data) {
    return http.patch(`/auc/${id}`, data);
  }

  delete(id) {
    return http.delete(`/auc/${id}`);
  }
  findByImsi(imsi) {
    return http.get(`/auc/imsi/${imsi}`);
  }
  findByIccid(iccid) {
    return http.get(`/auc/iccid/${iccid}`);
  }
}

export default new AucApi();
