import http from "./httpService";

let configure=window.globalThis.site_url;

export const GetShoppingContracts=(url)=>{

    return http.get(`${configure}/Shipping/GetShippingContracts`, url);
}
export const GetShoppingContract=(id)=>{

    return http.get(`${configure}/Shipping/GetShippingContract?Id=${id}`);
}
export const GetShoppingContractWithCompany=(id)=>{

    return http.get(`${configure}/Shipping/GetShippingContracts?CompanyId=${id}`);
}
export const GetShoppings=(id)=>{

    return http.get(`${configure}/Shipping/GetShippings?OrderId=${id}&PageNumber=0&PageSize=100000`);
}
export const SetShoppingContract=(ShoppingContract)=>{

    return http.post(`${configure}/Shipping/SetShippingContract`, JSON.stringify(ShoppingContract));
}
export const GetShippingCompanies=(url)=>{

    return http.get(`${configure}/Shipping/GetShippingCompanies`, url);
}
export const GetShipping=(url)=>{

    return http.get(`${configure}/Shipping/GetShippings`, url);
}
export const GetAllShippingCompanies=(url)=>{

    return http.get(`${configure}/Shipping/GetShippingCompanies?PageNumber=0&PageSize=1000000`);
}
export const GetShippingCompany=(id)=>{

    return http.get(`${configure}/Shipping/GetShippingCompany?Id=${id}`);
}
export const SetShippingCompany=(SetShippingCompany)=>{

    return http.post(`${configure}/Shipping/SetShippingCompany`, JSON.stringify(SetShippingCompany));
}
