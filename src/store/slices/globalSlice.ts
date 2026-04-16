import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialStateType{
    activeStep: string;
    completedSteps:string[];
    userId:string
}
const initialState:initialStateType = {
        activeStep:"Profile",
        completedSteps:[],
        userId:""
    }
const globalSlice = createSlice({
    name:"globalSlice",
    initialState,
    reducers:{
        setActiveStep: (state,action:PayloadAction<string>)=>{
            state.activeStep= action.payload
        },
        setCompletedSteps: (state,action:PayloadAction<string>)=>{
            state.completedSteps = [...state.completedSteps,action.payload]
        },
        setLoggedInUser: (state,action:PayloadAction<string>) => {
            state.userId=action.payload
        }
    }
})

export const {setActiveStep,setCompletedSteps,setLoggedInUser} = globalSlice.actions;
export default globalSlice.reducer;