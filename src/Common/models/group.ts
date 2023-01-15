export interface Group{

    id?: number,
    CompanyId?:number
    entityTypeId?: number,
    name?: string

}
export interface Groups extends Array<Group>{

}

