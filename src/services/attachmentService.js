import http from "./httpService";
import configure from './config.json'


export const attachmentUpload=(formData)=>{

    return http.post(`${configure.ForoshApi}/Attachment/Upload`,formData,{
        headers:'Content-Type: multipart/form-data'
    });
}


export const GetAttachments=(searchParams)=>{



    return http.get(`${configure.ForoshApi}/Attachment/GetAttachments`,searchParams)
}
export const DeleteAttachments=(deleteid)=>{
    let config={headers:
            {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
        data:{
            attachmentId:(deleteid)
        }
    }

    return http.delete(`${configure.ForoshApi}/Attachment/DeleteAttachments`,config)
}