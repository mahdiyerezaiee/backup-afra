import http from './httpService';

let configure=window.globalThis.site_url;


export const GetBazargahKharidList=(startDate,endDate)=>{

    return http.get(`${configure}/OutScope/GetBazargahKharidList?StartDate=${startDate}&EndDate=${endDate}`);
}

export const SyncWithSender=(body)=>{

    return http.post(`${configure}/OutScope/SyncWithSender`,JSON.stringify(body));
}
export const UpdateShippingReport=()=>{

    return http.post(`${configure}/OutScope/UpdateShippingReports`,JSON.stringify({}));
}

export const UpdateShippingReportByDate=(body)=>{

    return http.post(`${configure}/OutScope/UpdateShippingReportsByDate`,JSON.stringify(body));
}