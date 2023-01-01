import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { decodeToken } from './../utils/decodeToken';

let configure=window.globalThis.site_url;


const token = localStorage.getItem('token');
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // console.log(token);
}

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const refresh = localStorage.getItem('refresh');

const refreshR = {
  token
  , refresh
}

axios.interceptors.response.use(

    resp => resp, async error => {

      if (error.response.status === 401 && token  ) {


        axios.interceptors.response.eject()

        await axios.post(`${configure}/User/Refresh`, refreshR).then(response=>{
          localStorage.setItem('token', response.data.result.token);
          localStorage.setItem('refresh', response.data.result.refresh);
          axios.defaults.headers.common["Authorization"] = `Bearer ${
              response.data.result.token
          }`;

        }).catch(err=>{


          
            localStorage.clear()
            localStorage.setItem('error',JSON.stringify(err.response))
            window.location.replace('/logout')
          
        });





      }







      if (error.response.status === 500) {

        console.log(error);
        if (error.response.data.error.errorCode >= 400 && error.response.data.error.errorCode <= 499){

          toast.warning(error.response.data.error.message, {
            position: "top-right",
            closeOnClick: true
          });
        }
        else{
          toast.error('سرور پاسخگو نیست', {
            position: "top-right",
            closeOnClick: true
          });
        }


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
