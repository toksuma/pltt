import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // server backend
});

export default instance;
