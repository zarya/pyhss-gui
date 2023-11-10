import http from "../http-common";

class SubscriberApi {
  getAll() {
    return http.get("/subscriber/list");
  }

  get(id: number) {
    return http.get(`/subscriber/${id}`);
  }

  create(data: object) {
    return http.put("/subscriber/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/subscriber/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/subscriber/${id}`);
  }

  findByMsisdn(msisdn: string) {
    return http.get(`/subscriber/msisdn/${msisdn}`) 
  }

  findByImsi(imsi: string) {
    return http.get(`/subscriber/ims_subscriber_imsi/${imsi}`);
  }

  findManyByImsi(imsis: object) {
    return Promise.all(imsis.map((imsi: string) => this.findByImsi(imsi)
        .catch(function() {
          return { statusText: 'FAILED' };
        })
    ))
  }
}

export default new SubscriberApi();
