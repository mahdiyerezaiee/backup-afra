import http from "./httpService";

let configure=window.globalThis.site_url;

export const GetSimplifiedReports=()=>{

    return http.get(`${configure}/Report/GetSimplifiedReports`);
}
export const GetPeriodicSalesReport=(TypeId)=>{

    return http.get(`${configure}/Report/GetPeriodicSalesReport?ScheduleTypeId=${TypeId}`);
}
export const GetScheduleJobsReport=()=>{

    return http.get(`${configure}/Report/GetScheduleJobsReport`);
}
export const GetUsedBarBariReports=(StartDate , EndDate)=>{

    return http.get(`${configure}/Report/GetUsedBarBariReports?StartDate=${StartDate}&EndDate=${EndDate}`);
}
export const GetUsedBarBariReportsCompanies=(StartDate , EndDate,companyId,OnlyShipping)=>{

    return http.get(`${configure}/Report/GetUsedBarBariReports?StartDate=${StartDate}&EndDate=${EndDate}&CompanyId=${companyId}&OnlyShipping=${OnlyShipping}`);
}
export const GetCustomersReports=(StartDate , EndDate)=>{

    return http.get(`${configure}/Report/GetCustomersReports?StartDate=${StartDate}&EndDate=${EndDate}`);
}
export const GetOrdersReports=(StartDate , EndDate)=>{

    return http.get(`${configure}/Report/GetOrdersReports?StartDate=${StartDate}&EndDate=${EndDate}`);
}
export const GetShippingReports=(searchParams)=>{

    return http.get(`${configure}/Report/ShippingReports`,searchParams);
}
export const GetnProceessAttachments=()=>{

    return http.get(`${configure}/Report/GetInProceessAttachments`);
}