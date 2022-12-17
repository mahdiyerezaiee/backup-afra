import http from "./httpService";
import configure from "./config.json";

export const GetShoppingContracts=(url)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingContracts`, url);
}
export const GetShoppingContract=(id)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingContract?Id=${id}`);
}
export const GetShoppingContractWithCompany=(id)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingContracts?CompanyId=${id}`);
}
export const GetShoppings=(id)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippings?OrderId=${id}`);
}
export const SetShoppingContract=(ShoppingContract)=>{

    return http.post(`${configure.ForoshApi}/Shipping/SetShippingContract`, JSON.stringify(ShoppingContract));
}
export const GetShippingCompanies=(url)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingCompanies`, url);
}
export const GetAllShippingCompanies=(url)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingCompanies?PageSize=1000000`);
}
export const GetShippingCompany=(id)=>{

    return http.get(`${configure.ForoshApi}/Shipping/GetShippingCompany?Id=${id}`);
}
export const SetShippingCompany=(SetShippingCompany)=>{

    return http.post(`${configure.ForoshApi}/Shipping/SetShippingCompany`, JSON.stringify(SetShippingCompany));
}
