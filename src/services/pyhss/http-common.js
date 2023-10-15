import axios from "axios";

export default axios.create({
  baseURL: localStorage.getItem("api"),
  headers: {
    "Content-type": "application/json",
    "Provisioning-Key": localStorage.getItem('token')
  }
});
