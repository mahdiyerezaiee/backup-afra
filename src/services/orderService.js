import http from "./httpService";
import configure from './config.json';

export const SetOrder=(order)=>{

    return http.post(`${configure.ForoshApi}/Order/SetOrder`,JSON.stringify(order));
}
export const ChangeOrderStatus=(orderStatus)=>{

    return http.post(`${configure.ForoshApi}/Order/ChangeOrderStatus`,JSON.stringify(orderStatus));
}
export const GetAllOrders=()=>{

    return http.get(`${configure.ForoshApi}/Order/GetOrders`);
}
export const GetOrderDetails=(id)=>{

    return http.get(`${configure.ForoshApi}/Order/GetOrderDetails?OrderID=${id}`);
}
export const GetCustomerOrders=(UserName)=>{

    return http.get(`${configure.ForoshApi}/Order/GetOrders?UserName=${UserName}`);
}
export const GetOrder=(id)=>{

    return http.get(`${configure.ForoshApi}/Order/GetOrder?Id=${id}`);
}
export const GetDataWithSearchOrder=(url)=>{

    return http.get(`${configure.ForoshApi}/Order/GetOrders`,url);
}
export const editOrder=(order)=>{

    return http.post(`${configure.ForoshApi}/Order/EditOrder`,JSON.stringify(order));
}

export const orderSpliter=(body)=>{

    return http.post(`${configure.ForoshApi}/Order/SplitOrderDetail`,JSON.stringify(body))
}
export const editOrderDetail=(orderDetail)=>{

    return http.post(`${configure.ForoshApi}/Order/EditOrderDetail`,JSON.stringify(orderDetail));
}
export const GetPreviewAddress=(path)=>{

    return http.get(`${configure.ForoshApi}/Order/GetSplitedDetailsFromImportedFile?filePath=${path}`);
}

export const ordersSpliter=(body)=>{

    return http.post(`${configure.ForoshApi}/Order/SplitOrderDetails`,JSON.stringify(body))
}
