import NewProduct from "../../../models/product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import NewUser from "../../../models/user";

const initialState : NewUser[]=[]
const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state , action:PayloadAction<NewUser>)=>{

            console.log(action)
        },

    }
})
export const {addUser}=UserSlice.actions
export default UserSlice.reducer