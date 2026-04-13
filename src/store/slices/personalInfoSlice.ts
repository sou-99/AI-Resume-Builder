import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface personalInfostate {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  error:{
    email:boolean;
    name: boolean;
    phone:boolean;
    role:boolean;
    location:boolean;
  }
}
type updatePersonalInfoType ={
    key:"name" | "email" | "phone" | "role" | "location";
    value: string;
}
type errorType={
    key: string;
    value:boolean;
}
const initialState: personalInfostate = {
  name: "",
  email:"",
  phone:"",
  role:"",
  location:"",
  error:{
    email:false,
    name: false,
    phone:false,
    role:false,
    location:false
  }
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<updatePersonalInfoType>) =>{
        state[action.payload.key]=action.payload.value;
    },
    setError: (state,action:PayloadAction<errorType>) =>{
        state.error = {...state.error,[`${action.payload.key}`]:action.payload.value}
    }
    // }
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { updatePersonalInfo,setError } =
personalInfoSlice.actions;

export default personalInfoSlice.reducer;