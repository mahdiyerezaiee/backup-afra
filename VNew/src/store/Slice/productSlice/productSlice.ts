import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import NewProduct from '../../../models/product'
const initialState : NewProduct[]=[]
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