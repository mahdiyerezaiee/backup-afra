import http from './httpService';
import configure from './config.json';


export const GetBazargahKharidList=(startDate,endDate)=>{

    return http.get(`${configure.ForoshApi}/OutScope/GetBazargahKharidList?StartDate=${startDate}&EndDate=${endDate}`);
}

export const SyncWithSender=(body)=>{

    return http.post(`${configure.ForoshApi}/OutScope/SyncWithSender`,JSON.stringify(body));
}
export const UpdateShippingReport=()=>{

    return http.post(`${configure.ForoshApi}/OutScope/UpdateShippingReports`,JSON.stringify({}));
}

export const UpdateShippingReportByDate=(body)=>{

    return http.post(`${configure.ForoshApi}/OutScope/UpdateShippingReportsByDate`,JSON.stringify(body));
}