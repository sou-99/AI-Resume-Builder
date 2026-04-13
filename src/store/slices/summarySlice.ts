import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type expType = {
    label:string;
    value:string;
}
type summaryStateType = {
    experience: string;
    techSkills: string[];
    analyticalSkills: string[];
    summary:string;
}
type actionType = {
    key: "experience";
    value: expType;
}
type actionType1 = {
    key: "techSkills" | "analyticalSkills";
    value: string[];
}
const initialState: summaryStateType = {
    experience: "Fresher",
    techSkills: [],
    analyticalSkills: [],
    summary:""
}
const summarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {
        setExperience: (state, action: PayloadAction<string>) => {
            state.experience = action.payload;
        },
        setTechSkills: (state, action: PayloadAction<actionType1>) => {
            state[action.payload.key] = action.payload.value;
        },
        removeTechSkills: (state,action:PayloadAction<{key: "techSkills" | "analyticalSkills",value:string[]}>) =>{
            state[action.payload.key] = action.payload.value;
        },
        setSummary: (state,action:PayloadAction<string>) =>{
            state.summary = action.payload
        }
    }
});
export const {setExperience,setTechSkills,removeTechSkills,setSummary} = summarySlice.actions;
export default summarySlice.reducer;
