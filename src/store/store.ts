import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./rootReducer";
import logger from "redux-logger";
const persistConfig = {
  key: "root",
  storage,
//   whitelist: ["personalInfo"], // only persist this slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>{
    const middleware =getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
      //ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // these actions are from redux-persist that contains non serializable data
    })
    if (process.env.NODE_ENV === "development") {
        middleware.push(logger); // ✅ IMPORTANT
      }
  
      return middleware;
  
}
});

export const persistor = persistStore(store);
// ✅ Types (VERY IMPORTANT)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;