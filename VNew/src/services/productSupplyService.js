import http from "./httpService";

import configure from "./config.json";

export const GetAllProductSupplyForAdmin=()=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplies?IsAdmin=true&Active=false&PageNumber=0&PageSize=10`);
}
export const GetAllProductSupplyBord=()=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplies?Active=true&?IsAdmin=false&PageNumber=0&PageSize=1000`);
}
export const GetAllProductSupplyBordAdmin=()=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplies?Active=true&IsAdmin=true&PageNumber=0&PageSize=1000`);
}
export const GetAllProductSupply=(id)=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupply?Id=${id}`);
}
export const SetProductSupply=(ProductSupply)=>{

    return http.post(`${configure.ForoshApi}/Product/SetProductSupply` ,JSON.stringify(ProductSupply));
}
export const DeleteProductSupply=(ProductSupplyId)=>{

    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{
            id:(ProductSupplyId)
        }
    }
    return http.delete(`${configure.ForoshApi}/Product/DeleteProductSupply`,config);
}


export const GetAllProductWithSearch=(searchParams)=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplies`,searchParams)
}


