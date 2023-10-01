import http from "./http-common";

class AuthApi {
  login() {
    return http.get("/oam/ping");
  }

}

export default new AuthApi();
