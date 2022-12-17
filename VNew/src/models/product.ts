export default interface NewProduct{

name:string,
    englishName: string,
    price: number,
    active: boolean,
    minSellableAmount: number,
    maxSellableAmount: number,
    measureUnitId: number,
    groupId: number,
    measureUnit: number
}