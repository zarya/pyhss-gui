import http from "./http-common";
import axios from "axios";

class AuthApi {
  login(url: string, token: string) {
    return axios.create({
      baseURL: url,
      headers: {
        "Content-type": "application/json",
        "Provisioning-Key": token
      }
    }).get("/oam/ping");
  }
}

export default new AuthApi();
