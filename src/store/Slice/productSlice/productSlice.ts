import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewProduct }from '../../../Common/models/product'
const initialState : NewProduct={
    name: '',
    englishName: '',
    price: 0,
    active: true,
    minSellableAmount: 0,
    maxSellableAmount: 0,
    measureUnitId: 0,
    groupId: 0,
    measureUnit: 0,
  
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct:(state , action:PayloadAction<NewProduct>)=>{

            console.log(action)
        },
        Product:(state , action:PayloadAction<NewProduct>)=>{
            return {
                ...state,
                order: action.payload,

            }
},
    }
})
export const {addProduct}=productSlice.actions
export const {Product}=productSlice.actions
export default productSlice.reducer