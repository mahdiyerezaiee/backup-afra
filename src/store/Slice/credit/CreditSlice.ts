import { createSlice } from "@reduxjs/toolkit";

export const CreditState = {
    loading: false,
    body: [],
   
  };
  
  const CreditSlice = createSlice({
    name: "Credit",
    reducers: {
      setCredit: (state:any, action:any) => {
        state.loading = true;
        state.body = action.payload.body;
      },
      setCreditSuccess: (state:any , action:any) => {
        state.loading = false;
      }
    },
    initialState: CreditState
  });
  
  export const { setCredit, setCreditSuccess } = CreditSlice.actions;
  export const creditReducer = CreditSlice.reducer;