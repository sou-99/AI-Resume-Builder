import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { DateValue } from "@chakra-ui/react"

export type expType = {
    currentRole: string,
    companyName: string,
    fromdate: DateValue[] | undefined,
    toDate: DateValue[] | undefined,
    isPresent: boolean,
    techUsed: string,
    roleAndResponsibility: string;
    projectName: string;
    clientName: string;
}

export type expTypeError = {
    currentRole: boolean,
    companyName: boolean,
    fromdate: boolean,
    toDate: boolean,
    isPresent: boolean,
    techUsed: boolean,
    roleAndResponsibility: boolean;
    projectName: boolean;
    clientName: boolean;
}

type expState = {
    experience: expType[];
    error: expTypeError[];
}

const initialState: expState = {
    experience: [
        {
            currentRole: "",
            companyName: "",
            fromdate: undefined,
            toDate: undefined,
            isPresent: false,
            techUsed: "",
            roleAndResponsibility: "",
            projectName: "",
            clientName: "",
        }
    ],
    error: [{
        currentRole: false,
        companyName: false,
        fromdate: false,
        toDate: false,
        isPresent: false,
        techUsed: false,
        roleAndResponsibility: false,
        projectName: false,
        clientName: false,
    }]
}
const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        upDateProjectDetails: (state, action: PayloadAction<expType[]>) => {
            state.experience = action.payload
        },
        setError: (state, action: PayloadAction<expTypeError[]>) => {
            state.error = action.payload
        },
    }
})

export const { upDateProjectDetails, setError } = experienceSlice.actions;
export default experienceSlice.reducer;