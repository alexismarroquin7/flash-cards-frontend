import axios from "axios";

export const axiosWithBaseURL = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:5000/api` : '{production_link}/api'
  });
}