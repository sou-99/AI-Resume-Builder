import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type stateType = {
    skills:string[];
}
const initialState:stateType = {
    skills:[],
}
const skillSlice = createSlice({
    name:"skill",
    initialState,
    reducers:{
        addSkills: (state,action:PayloadAction<string[]>) =>{
            state.skills = action.payload
        }
    }
})
export const {addSkills} = skillSlice.actions;
export default skillSlice.reducer;