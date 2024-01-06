import http from "../http-common";

class PcrfApi {
  push(data: object) {
    return http.put('/pcrf', data);
  }
  subscriber(imsi: string) {
    return http.get(`/pcrf/pcrf_subscriber_imsi/${imsi}`);
  }
  subscriberApn(imsi: string, apn: string) {
    return http.get(`/pcrf/pcrf_subscriber_imsi/${imsi}/${apn}`);
  }
  pcscfRestoration(pcscf: string) {
    return http.put("/pcrf/pcscf_restoration", {"pcscf": pcscf});
  }
  pcscfRestorationSubscriber(imsi: string, msisdn: string) {
    return http.put("/pcrf/pcscf_restoration", {"imsi": imsi, "msisdn": msisdn});
  }
  subscriberRouting(ip: string) {
    return http.get(`/pcrf/subscriber_routing/${ip}`);
  }
  chargingRule(id: number) {
    return http.get(`/pcrf/${id}`);
  }
}

export default new PcrfApi();
