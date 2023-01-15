import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewProduct }from '../../../Common/models/product'
const initialState : NewProduct={

}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct:(state , action:PayloadAction<NewProduct>)=>{

            console.log(action)
        },
        Products:(state , action:PayloadAction<NewProduct>)=>{
            return {
                ...state,
                order: action.payload,

            }
},
    }
})
export const {addProduct,Products}=productSlice.actions
export default productSlice.reducer