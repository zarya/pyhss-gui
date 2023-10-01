import http from "./http-common";

class AuthApi {
  login() {
    return http.get("/operation_logs/last");
  }

}

export default new AuthApi();
