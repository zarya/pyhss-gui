import http from "../http-common";

class AucApi {
  getAll() {
    return http.get("/auc/list");
  }

  get(id: number) {
    return http.get(`/auc/${id}`);
  }

  create(data: object) {
    return http.put("/auc/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/auc/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/auc/${id}`);
  }
  findByImsi(imsi: string) {
    return http.get(`/auc/imsi/${imsi}`);
  }
  findByIccid(iccid: string) {
    return http.get(`/auc/iccid/${iccid}`);
  }
}

export default new AucApi();
