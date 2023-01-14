import http from "./httpService";

let configure=window.globalThis.site_url;

export const SetOrder=(order)=>{

    return http.post(`${configure}/Order/SetOrder`,JSON.stringify(order));
}
export const ChangeOrderStatus=(orderStatus)=>{

    return http.post(`${configure}/Order/ChangeOrderStatus`,JSON.stringify(orderStatus));
}
export const GetAllOrders=()=>{

    return http.get(`${configure}/Order/GetOrders`);
}
export const GetOrderDetails=(id)=>{

    return http.get(`${configure}/Order/GetOrderDetails?OrderID=${id}`);
}
export const GetOrderDetailsAdmin=(id)=>{

    return http.get(`${configure}/Order/GetOrderDetails?OrderID=${id}&IsAdmin=true`);
}
export const GetCustomerOrders=(UserName)=>{

    return http.get(`${configure}/Order/GetOrders?UserName=${UserName}`);
}
export const GetOrder=(id)=>{

    return http.get(`${configure}/Order/GetOrder?Id=${id}`);
}
export const GetDataWithSearchOrder=(url)=>{

    return http.get(`${configure}/Order/GetOrders`,url);
}
export const HasOverDuePaymentsByAttachments=()=>{

    return http.get(`${configure}/Order/HasOverDuePaymentsByAttachments`);
}
export const editOrder=(order)=>{

    return http.post(`${configure}/Order/EditOrder`,JSON.stringify(order));
}

export const orderSpliter=(body)=>{

    return http.post(`${configure}/Order/SplitOrderDetail`,JSON.stringify(body))
}
export const editOrderDetail=(orderDetail)=>{

    return http.post(`${configure}/Order/EditOrderDetail`,JSON.stringify(orderDetail));
}
export const GetPreviewAddress=(path)=>{

    return http.get(`${configure}/Order/GetSplitedDetailsFromImportedFile?filePath=${path}`);
}

export const ordersSpliter=(body)=>{

    return http.post(`${configure}/Order/SplitOrderDetails`,JSON.stringify(body))
}
export const addOrder =(body)=>{

    return http.post(`${configure}/Order/AddOrder`,JSON.stringify(body))
}

export const DeleteOrderDetail=(id)=>{


    let config={headers:
        {
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        data:{
            id:(id)
        }
        }

    return http.post(`${configure}/Order/DeleteOrderDetail`,config);
}