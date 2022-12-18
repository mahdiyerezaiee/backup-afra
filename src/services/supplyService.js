import http from "./httpService";
import configure from "./config.json";

export const GetAllSuppliers=(url)=>{

    return http.get(`${configure.ForoshApi}/Supply/GetSuppliers` , url);
}
export const GetSupplier=(id)=>{

    return http.get(`${configure.ForoshApi}/Supply/GetSupplier?Id=${id}`);
}

export const SetSupplier=(supplier)=>{

    return http.post(`${configure.ForoshApi}/Supply/SetSupplier`,JSON.stringify(supplier));
}
export const  DeleteSupplier=id =>{
    let config={headers:
        {
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:{
            id:(id)
        }
        }
    return http.delete(`${configure.ForoshApi}/Supply/DeleteSupplier`,config);
}

export const GetAllSupplies=()=>{

    return http.get(`${configure.ForoshApi}/Supply/GetSupplys` );
}
export const GetSupply=(id)=>{

    return http.get(`${configure.ForoshApi}/Supply/GetSupply?Id=${id}`);
}
export const SetSupply=(supply)=>{

    return http.post(`${configure.ForoshApi}/Supply/SetSupply`,JSON.stringify(supply));
}
export const  DeleteSupply=id =>{
    let config={headers:
        {
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:{
            id:(id)
        }
        }
    return http.delete(`${configure.ForoshApi}/Supply/DeleteSupply`,config);
}
export const GetDataWithSearchSupply=(url)=>{

    return http.get(`${configure.ForoshApi}/Supply/GetSupplys`,url);
}