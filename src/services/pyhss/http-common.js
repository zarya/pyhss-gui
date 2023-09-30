import axios from "axios";

export default axios.create({
  baseURL: "http://100.100.0.43:8080/",
  headers: {
    "Content-type": "application/json"
  }
});
