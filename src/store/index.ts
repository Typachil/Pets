import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerTodo from "./reducerTodo";
import reducerUI from "./reducerUI";

let rootReducer = combineReducers({
    reducerUI,
    reducerTodo
})

const store = configureStore({
    reducer: {
        rootReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;