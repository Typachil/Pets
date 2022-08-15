import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    darkTheme: boolean;
}

const initialState: State = {
    darkTheme: false,
};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<boolean>) {
            state.darkTheme = action.payload
        },
    },
});

export const { changeTheme } = UISlice.actions;

export default UISlice.reducer;
