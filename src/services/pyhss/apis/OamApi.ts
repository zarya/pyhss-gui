import http from "../http-common";

class OamApi {
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
