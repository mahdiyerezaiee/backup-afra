import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { NewUser } from "../../../models/user";

const initialState: NewUser = {





}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<NewUser>) => {




            return { ...action.payload }
        },
        removeUser: () => {
            return {}
        }




    }
})
export const { addUser, removeUser } = UserSlice.actions
export default UserSlice.reducer