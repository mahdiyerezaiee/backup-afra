import http from './httpService'
let configure=window.globalThis.site_url;


export const GetCompanyChild=()=>{

    return http.get(`${configure}/Company/GetChildCompanies`);

}
