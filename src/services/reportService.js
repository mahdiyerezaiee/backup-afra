import http from "./httpService";
import configure from "./config.json";

export const GetSimplifiedReports=()=>{

    return http.get(`${configure.ForoshApi}/Report/GetSimplifiedReports`);
}
export const GetPeriodicSalesReport=(TypeId)=>{

    return http.get(`${configure.ForoshApi}/Report/GetPeriodicSalesReport?ScheduleTypeId=${TypeId}`);
}