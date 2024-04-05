import { createSlice } from "@reduxjs/toolkit";

interface UserDetails{
    email: string,
    first_name: string,
    last_name: string,
    id: string,
    role: string,
    token:string
}

interface UserState {
    userDetails: UserDetails|null;
}

const initialState:UserState = {
    userDetails:null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails : (state, action)=>{
        // state.email=action.payload.email,
        // state.first_name=action.payload.first_name,
        // state.last_name = action.payload.last_name,
        // state.role = action.payload.role,
        // state.id = action.payload.id
        state.userDetails=action.payload;
    },
    deleteUserDetails:(state)=>{
        // state.email= "",
        // state.first_name="",
        // state.last_name = "",
        // state.role = "",
        // state.id = ""
        state.userDetails=null;
    }
  },
});

export const {setUserDetails, deleteUserDetails} = userSlice.actions;
export default userSlice;
