import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerUser from "./reducers/reducerUser";
import reducerUI from "./reducers/reducerUI";
import reducerPets from "./reducers/reducerPets";
import { petsAPI } from "./services/PetsService";

const rootReducer = combineReducers({
    reducerUI,
    reducerUser,
    reducerPets,
    [petsAPI.reducerPath] : petsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];