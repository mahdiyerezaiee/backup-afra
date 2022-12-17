import http from "./httpService";
import config from "./config.json";
import configure from "./config.json";

export const GetProductSupplyConditions=(id)=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplyConditions?ProductSupplyId=${id}&IsAdmin=true`);

}
export const GetProductSupplyConditionsCustomer=(id)=>{

    return http.get(`${configure.ForoshApi}/Product/GetProductSupplyConditions?ProductSupplyId=${id}&IsAdmin=false`);

}
export const SetProductSupplyConditions=(body)=>{

    return http.post(`${configure.ForoshApi}/Product/SetProductSupplyCondition` , JSON.stringify(body));

}
export const  DeleteProductSupplyCondition=id =>{
    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{
            id:(id)
        }
    }
    return http.delete(`${configure.ForoshApi}/Product/DeleteProductSupplyCondtion`,config);
}