import http from "../http-common";

class OamApi {
  reconcile(imsi: string) {
    return http.get(`/oam/reconcile/imsi/${imsi}`);
  }
  deregister(imsi: string) {
    return http.get(`/oam/deregister/${imsi}`);
  }
  servingSubs() {
    return http.get("/oam/serving_subs");
  }
  servingSubsIms() {
    return http.get("/oam/serving_subs_ims");
  }
  servingSubsPcrf() {
    return http.get("/oam/serving_subs_pcrf");
  }
  diameterPeers() {
    return http.get("/oam/diameter_peers");
  }
}

export default new OamApi();
