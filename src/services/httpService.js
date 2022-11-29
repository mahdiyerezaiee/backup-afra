import axios from "axios";
import { toast } from "react-toastify";
import config from './config.json'
import { decodeToken } from './../utils/decodeToken';



const token = localStorage.getItem('token');
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // console.log(token);
}
const refresh = localStorage.getItem('refresh');



axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.interceptors.response.use(

  resp => resp, async error => {

    if (error.response.status === 401) {

      const refreshR = {
        token, refresh
      }
      axios.interceptors.response.eject()
      
        axios.post(`${config.ForoshApi}/User/Refresh`, refreshR).then(response=>{
          localStorage.setItem('token', response.data.result.token);
          localStorage.setItem('refresh', response.data.result.refresh);
          axios.defaults.headers.common["Authorization"] = `Bearer ${
            response.data.result.token
          }`;
        
        }).catch(err=>{

          const tokenError = new Error("زمان کاربری منقضی شده است");
          tokenError.originalError = error;
          window.location.replace('/logout')

        });
     
        
       

   
      }
    






    if (error.response.status === 500) {

      console.log(error);
      toast.error("مشکلی از سمت سرور رخ داده است.", {
        position: "top-right",
        closeOnClick: true
      });
    }


    return Promise.reject(error);
  });

  const axiosWithTokenRefresh = config =>
  axios(config).catch(error =>
    error.hasRefreshedToken ? axios(config) : Promise.reject(error)
  );

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
