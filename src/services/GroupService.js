import http from './httpService';
import configure from './config.json';

export const GetGroupsForEntity=(entityTypeId , url)=>{

    return http.get(`${configure.ForoshApi}/Group/GetGroups?EntityTypeId=${entityTypeId}` , url)
}
export const GetGroupById=(groupId)=>{

    return http.get(`${configure.ForoshApi}/Group/GetGroup?Id=${groupId}`)
}
export const SetGroup=(group)=>{

    return http.post(`${configure.ForoshApi}/Group/SetGroup`,JSON.stringify(group))
}
export const DeleteGroup=(groupId)=>{
    let config={headers:
    {
        Authorization:`Bearer ${localStorage.getItem('token')}`
    },
    data:{
        id:(groupId)
    }
    }

    return http.delete(`${configure.ForoshApi}/Group/DeleteGroup`,config)
}