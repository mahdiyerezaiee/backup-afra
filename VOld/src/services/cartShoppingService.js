import http from "./httpService";
import config from "./config.json";
import configure from "./config.json";

export const AddTOCart=(addToCart)=>{

    return http.post(`${configure.ForoshApi}/Order/AddToCart`,JSON.stringify(addToCart));
}
export const GetShoppingCart=(id)=>{

    return http.get(`${configure.ForoshApi}/Order/GetShoppingCart?CustomerId=${id}`);
}
export const DeleteItemCart=(deleteid , customerId )=>{
    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{
            productId:deleteid,
            customerId:customerId,

        }

    }
    return http.delete(`${configure.ForoshApi}/Order/DeleteCart` , config);
}
export const DeleteItemCarts=( customerId )=>{
    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{

            customerId:customerId,

        }

    }
    return http.delete(`${configure.ForoshApi}/Order/DeleteCart` , config);
}
