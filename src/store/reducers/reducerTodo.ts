import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
}

type State = {
    list: Todo[]
}

const initialState: State = {
    list: [],
}


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state,action : PayloadAction<string>){
            state.list.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false
            })
        },
        toggleComplete(state, action: PayloadAction<string>){
            const toggledTodo = state.list.find(todo => todo.id === action.payload)
            if (toggledTodo){
                toggledTodo.completed = !toggledTodo.completed
            }
        },
        removeTodos(state){
            state.list = state.list.filter(todo => todo.completed === false);
        },
    }
})

export const {addTodo, toggleComplete, removeTodos} = todoSlice.actions;

export default todoSlice.reducer;