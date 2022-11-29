import http from "./httpService";
import configure from "./config.json";

export const GetOrganisationCode=(company)=>{

    return http.get(`${configure.ForoshApi}/Organization/GetOrganization?NationalId=${company}`);



}
export const GetOrganisationById=(id)=>{

    return http.get(`${configure.ForoshApi}/Organization/GetOrganization?Id=${id}`);



}
export const GetAllOrganisationCode=(url)=>{

    return http.get(`${configure.ForoshApi}/Organization/GetOrganizations` , url);



}
export const GetAllOrganisation=()=>{

    return http.get(`${configure.ForoshApi}/Organization/GetOrganizations?PageNumber=0&PageSize=500000000` );



}
export const SetOrganisation=(organisation)=>{

    return http.post(`${configure.ForoshApi}/Organization/SetOrganization`,JSON.stringify(organisation));



}
export const DeleteOrganization=(deleteid)=>{
    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{
            id:(deleteid)
        }
    }

    return http.delete(`${configure.ForoshApi}/Organization/DeleteOrganization`,config)
}
