import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User{
    name: string;
    email: string;
    password: string;
}

export interface State{
    user: User | null
}

const initialState: State = {
    user: JSON.parse(localStorage.getItem('user')) || null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registration(state,action : PayloadAction<User>){
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null
            localStorage.removeItem('user');
        }
    }
})

export const {registration, logout} = userSlice.actions;

export default userSlice.reducer;