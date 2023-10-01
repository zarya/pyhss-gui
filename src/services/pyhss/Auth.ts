import http from "./http-common";

class AuthApi {
  login() {
    return http.get("/apn/list");
  }

}

export default new AuthApi();
