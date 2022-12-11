import http from './httpService';
import config from './config.json';
let configure=window.globalThis.site_url;
export const GetAllProvince=()=>{

    return http.get(`${configure}/Address/GetProvinces`);

}
export const SetAddress=(body)=>{

    return http.post(`${configure}/Address/SetAddress`,JSON.stringify(body));

}
export const GetAddress = (entityTypeId , entityId) => {
    return http.get(`${configure}/Address/GetAddresss?EntityId=${entityId}&EntityTypeId=${entityTypeId}`);
}