import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:5000/api` : '{production_link}/api',
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
}