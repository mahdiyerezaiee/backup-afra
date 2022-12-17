import config from './config.json'
import http from './httpService'


export const GetAllAttributes=(entityTypeId)=>{

    return http.get(`${config.ForoshApi}/Attribute/GetAttributes?EntityTypeId=${entityTypeId}`)
}
export const GetAttribute=(Id)=>{

    return http.get(`${config.ForoshApi}/Attribute/GetAttribute?Id=${Id}`)
}

export const SetAttribute=(attribute)=>{

    return http.post(`${config.ForoshApi}/Attribute/SetAttribute`,JSON.stringify(attribute))
}

export const SetAttributeValues=(attribute)=>{

    return http.post(`${config.ForoshApi}/Attribute/SetAttributeValues`,JSON.stringify(attribute))
}

export const GetAttributeValues=(attributeId,EntityId)=>{

    return http.get(`${config.ForoshApi}/Attribute/GetAttributeValue?AttributeTypeId=${attributeId}&EntityId=${EntityId}`)
}
