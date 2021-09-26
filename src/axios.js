import axios from "axios";

const instance = axios.create({
  baseURL: "http://test-api.edfa3ly.io/",
});
export default instance;
