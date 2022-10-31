import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, userGoals } from "../models/User";

export interface State{
    user: User | null;
    userGoals: userGoals[] | null;
}

const initialState: State = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userGoals: [
        {id: 0, name: 'Прогулка в парке', status: 'cancel'},
        {id: 1, name: 'Обед', status: 'complete'},
        {id: 2, name: 'Перекус', status: 'half-complete'},
        {id: 3, name: 'Игры', status: 'in-progress'},
        {id: 4, name: 'Обед', status: 'complete'},
        {id: 5, name: 'Обед', status: 'complete'},
        {id: 6, name: 'Обед', status: 'complete'},
        {id: 7, name: 'Обед', status: 'complete'},
        {id: 8, name: 'Обед', status: 'complete'},
    ]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state,action : PayloadAction<User>){
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null
            localStorage.removeItem('user');
        },
        changeGoal(state, action : PayloadAction<number>){
            const goal = state.userGoals.find((item) => item.id === action.payload);
            switch(goal.status){
                case 'in-progress':
                    goal.status = 'half-complete';
                    return;
                case 'complete':
                    goal.status = 'cancel';
                    return
                case 'cancel':
                    goal.status = 'in-progress';
                    return
                case 'half-complete':
                    goal.status = 'complete';
                    return;
                default: 
                    return;         
            }
        }
    }
})

export const {setUser, logout, changeGoal} = userSlice.actions;

export default userSlice.reducer;