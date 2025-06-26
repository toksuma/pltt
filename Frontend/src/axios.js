import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // đúng với server Express backend
});

export default instance;
