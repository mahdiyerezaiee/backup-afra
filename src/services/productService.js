import http from './httpService';
import configure from './config.json';


export const GetAllProducts=()=>{

    return http.get(`${configure.ForoshApi}/Product/GetProducts?Active=true&isAdmin=true`);
}
export const GetProducts=()=>{

    return http.get(`${configure.ForoshApi}/Product/GetProducts?Active=true&isAdmin=true&PageSize=10000000`);
}

export const SetProduct=(product)=>{

    return http.post(`${configure.ForoshApi}/Product/SetProduct`,JSON.stringify({product}));
}
export const  getEditProduct=id =>{
    return http.get(`${configure.ForoshApi}/Product/GetProduct?Id=${id}`);
}
export const  DeleteProduct=id =>{
    let config={headers:
        {
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:{
            id:(id)
        }
        }
    return http.delete(`${configure.ForoshApi}/Product/DeleteProduct`,config);
}

export const GetProductsWithSearch=(searchParams)=>{

    return http.get(`${configure.ForoshApi}/Product/GetProducts?Active=true&isAdmin=true`,searchParams)
}