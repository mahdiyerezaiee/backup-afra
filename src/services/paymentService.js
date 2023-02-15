import http from "./httpService";

let configure=window.globalThis.site_url;


export const CreatePayment=(body)=>{

    return http.post(`${configure}/Payment/CreatePayment`,JSON.stringify(body));
}