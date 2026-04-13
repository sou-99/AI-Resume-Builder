import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialStateType{
    activeStep: string;
    completedSteps:string[]
}
const initialState:initialStateType = {
        activeStep:"Profile",
        completedSteps:[]
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
        }
    }
})

export const {setActiveStep,setCompletedSteps} = globalSlice.actions;
export default globalSlice.reducer;