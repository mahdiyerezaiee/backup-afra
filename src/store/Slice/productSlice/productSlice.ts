import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewProduct, ProductList }from '../../../Common/models/product'
const initialState : NewProduct={

}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct:(state , action:PayloadAction<NewProduct>)=>{

           return{...action.payload}
        },
        Products:(state , action:PayloadAction<ProductList>)=>{
            return {
                ...state,
                order: action.payload,

            }
},
    }
})
export const {addProduct,Products}=productSlice.actions
export default productSlice.reducer