import axios from "axios"

const API = axios.create({
  baseURL: "https://taskeeper-server.vercel.app/api",
})

export default API