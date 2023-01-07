export default interface newOrganizaton{
    id?:number,
    name?:string,
  
    nationalId?:string,
    registrationNumber?:string,
    
    parentId?:number,
    groupId	?:number



}
export default interface OrganizationList extends Array<newOrganizaton>{
    
}