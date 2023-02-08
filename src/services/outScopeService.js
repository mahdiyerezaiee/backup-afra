import http from './httpService';

let configure=window.globalThis.site_url;


export const GetBazargahKharidList=(startDate,endDate)=>{

    return http.get(`${configure}/OutScope/GetBazargahKharidList?StartDate=${startDate}&EndDate=${endDate}`);
}
export const GetBazargahKharidListWithCompany=(startDate,endDate,companyId)=>{

    return http.get(`${configure}/OutScope/GetBazargahKharidList?StartDate=${startDate}&EndDate=${endDate}&CompanyId=${companyId}`);
}

export const SyncWithSender=(body)=>{

    return http.post(`${configure}/OutScope/SyncWithSender`,JSON.stringify(body));
}
export const UpdateShippingReport=()=>{

    return http.post(`${configure}/OutScope/UpdateShippingReports`,JSON.stringify({}));
}

export const UpdateAllShippingReport=(body)=>{

    return http.post(`${configure}/OutScope/UpdateShippingReports`,JSON.stringify(body));
}

export const SyncShippingsWithBazargah=(body)=>{

    return http.post(`${configure}/OutScope/SyncShippingsWithBazargah`,JSON.stringify(body));
}

