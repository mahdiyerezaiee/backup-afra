import http from './httpService';
import config from './config.json';
export const GetSupportRequesstsAdmin=(url)=>{

    return http.get(`${config.ForoshApi}/SupportRequest/GetSupportRequests?OnlineChat=false` , url);
}

export const GetSupportRequesstsUser=(id , url)=>{

    return http.get(`${config.ForoshApi}/SupportRequest/GetSupportRequests?CreatorId=${id}&OnlineChat=false` ,url);
}
export const GetSupportRequestMessages=(id)=>{

    return http.get(`${config.ForoshApi}/SupportRequest/GetSupportRequestMessages?SupportRequestId=${id}`);
}
export const  setSupportRequessts=(supportRequess) =>{
    return http.post(`${config.ForoshApi}/SupportRequest/SetSupportRequest`, JSON.stringify(supportRequess));
}
export const  SetSupportRequestMessage=(SupportRequestMessage) =>{
    return http.post(`${config.ForoshApi}/SupportRequest/SetSupportRequestMessage`,JSON.stringify(SupportRequestMessage));
}