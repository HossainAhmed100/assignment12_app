import axios from "axios";
// baseURL: "https://assignment12.up.railway.app/",

const API = axios.create({
  baseURL: "http://localhost:5000/",
});
export default API;
