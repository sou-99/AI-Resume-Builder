import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type educationType = {
    education: string;
    university:string;
    from:string;
    to:string;
    cgpa:string;
}

type stateType = {
    education: string;
    university:string;
    from:string;
    to:string;
    cgpa:string;
    error:{
        education:boolean,
        university:boolean,
        from:boolean,
        to:boolean,
        cgpa:boolean,
    };
    educations:educationType[] | [];
    languages:string[];
}
type payloadType = {
    key:"education" | "university" | "from" | "to" | "cgpa";
    value:string;
}
type payloadType1 = {
    key:"education" | "university" | "from" | "to" | "cgpa";
    value:boolean;
}
const initialState:stateType = {
    education:"Select Education Type",
    university:"",
    from:"",
    to:"",
    cgpa:"",
    error:{
        education:false,
        university:false,
        from:false,
        to:false,
        cgpa:false,
    },
    educations:[],
    languages:[]
}

const educationSlice = createSlice({
    name:"education",
    initialState,
    reducers:{
        setEducation: (state, action: PayloadAction<payloadType>) => {
            state[action.payload.key] = action.payload.value
        },
        setError: (state,action:PayloadAction<payloadType1>) => {
            state.error[action.payload.key] = action.payload.value
        },
        handleEducationLists: (state,action:PayloadAction<educationType[] | []>) => {
            state.educations = action.payload
        },
        resetForm: (state) =>{
            state.education="Select Education Type"
            state.university=""
            state.from=""
            state.to=""
            state.cgpa=""
        },
        setLanguages: (state, action:PayloadAction<string[] | []>) =>{
            state.languages = action.payload
        }
    }
})
export const {setEducation,setError,handleEducationLists,resetForm,setLanguages} = educationSlice.actions;
export default educationSlice.reducer;