import http from "./httpService";

import config from "./config.json";
export const getAllWithRole=(roleId)=>{
    return http.get(`${config.ForoshApi}/AuthenticatedUser/GetUsers?RoleIds=${roleId}`);
}
export const setCustomerInfo=(user)=>{
    return http.put(`${config.ForoshApi}/AuthenticatedUser/SetUserInfo`,JSON.stringify(user));
}



export const CreateCustomer=(user)=>{
    return http.post(`${config.ForoshApi}/AuthenticatedUser/CreateUser`,JSON.stringify(user));
}


