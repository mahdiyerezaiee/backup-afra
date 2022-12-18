import configure from './config.json';
import http from './httpService';

export const GetAllWareHouses=(url)=>{

    return http.get(`${configure.ForoshApi}/WareHouse/GetWareHouses`, url);
}
export const GetAllWareHouse=(id)=>{

    return http.get(`${configure.ForoshApi}/WareHouse/GetWareHouse?Id=${id}`);
}
export const SetWareHouses=(warehouse)=>{

    return http.post(`${configure.ForoshApi}/WareHouse/SetWareHouse`,JSON.stringify(warehouse));
}

export const GetProductHouses=()=>{

    return http.get(`${configure.ForoshApi}/WareHouse/GetProductWareHouses`);
}
export const DeleteHouses=(warehouseId)=>{

    let config={headers:
        {
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:{
            id:(warehouseId)
        }
        }
    return http.delete(`${configure.ForoshApi}/WareHouse/DeleteWareHouse`,config);
}