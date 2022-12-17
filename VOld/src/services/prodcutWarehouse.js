import http from './httpService';
import config from './config.json';


export const GetAllProducts=()=>{

    return http.get(`${config.ForoshApi}/Product/GetProducts?isAdmin=true`);
}

export const SetProductWareHouses=(wareProduct)=>{

    return http.post(`${config.ForoshApi}/WareHouse/SetProductWareHouses`,JSON.stringify(wareProduct));
} 
export const GetProductWareHouses=(id)=>{

    return http.get(`${config.ForoshApi}/WareHouse/GetProductWareHouses?ProductId=${id}`);
}