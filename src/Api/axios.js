import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: "https://amazon-clone-backend-2nak.onrender.com"
})