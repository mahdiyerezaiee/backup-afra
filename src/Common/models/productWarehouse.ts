export interface ProductWareHouse{
    id?: number,
    wareHouseId?: number,
    wareHouseName?: string,
    productId?: number,
    quantity?: number,
    consumableQuantity?: number,
    reservedQuantity?: number
}



export interface ProductWareHouses extends Array<ProductWareHouse>{
   
}