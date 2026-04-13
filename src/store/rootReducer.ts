import { combineReducers } from "@reduxjs/toolkit";
import personalInfoSlice from "./slices/personalInfoSlice";
import globalSlice from "./slices/globalSlice";
import summarySlice from "./slices/summarySlice";
import skillSlice from "./slices/skillSlice";
import experienceSlice from './slices/experienceSlice';
import educationSlice from "./slices/educationSlice";
const rootReducer = combineReducers({
    personalInfo: personalInfoSlice,
    globalInfo: globalSlice,
    summarySlice: summarySlice,
    skillSlice: skillSlice,
    experienceSlice: experienceSlice,
    educationSlice: educationSlice
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;