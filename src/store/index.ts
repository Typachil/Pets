import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerUser from "./reducers/reducerUser";
import reducerUI from "./reducers/reducerUI";

const rootReducer = combineReducers({
    reducerUI,
    reducerUser
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];