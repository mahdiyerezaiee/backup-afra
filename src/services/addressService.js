import http from './httpService';
import config from './config.json';

export const GetAllProvince=()=>{

    return http.get(`${config.ForoshApi}/Address/GetProvinces`);

}
export const SetAddress=(body)=>{

    return http.post(`${config.ForoshApi}/Address/SetAddress`,JSON.stringify(body));

}
export const GetAddress = (entityTypeId , entityId) => {
    return http.get(`${config.ForoshApi}/Address/GetAddresss?EntityId=${entityId}&EntityTypeId=${entityTypeId}`);
}