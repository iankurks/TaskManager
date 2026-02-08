import axios from "axios";

export const api = axios.create({ 
  // baseURL: "http://localhost:5000/api"
  baseURL : "https://taskmanagerbackend-production-7f1c.up.railway.app/api"

});