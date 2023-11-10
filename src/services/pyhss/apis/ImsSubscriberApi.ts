import http from "../http-common";

class ImsSubscriberApi {
  getAll() {
    return http.get("/ims_subscriber/list");
  }

  get(id: number) {
    return http.get(`/ims_subscriber/${id}`);
  }

  create(data: object) {
    return http.put("/ims_subscriber/", data);
  }

  update(id: number, data: object) {
    return http.patch(`/ims_subscriber/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/ims_subscriber/${id}`);
  }

  findByImsi(imsi: string) {
    return http.get(`/ims_subscriber/ims_subscriber_imsi/${imsi}`);
  }

  findManyByImsi(imsis: object) {
    return Promise.all(imsis.map((imsi: string) => this.findByImsi(imsi)
        .catch(function() {
          return { statusText: 'FAILED' };
        })
    ))
  }

  findByMsisdn(id: string) {
    return http.get(`/ims_subscriber/ims_subscriber_msisdn/${id}`);
  }
}

export default new ImsSubscriberApi();
