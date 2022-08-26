import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    theme: 'dark' | 'light';
    screen: 'mobile' | 'tablet' | 'laptop' | 'desktop';
}

const changeScreenType = (width : number) =>{
    if (width <= 768) return 'mobile';
    if (width <= 1280 && width > 768) return 'tablet';
    if (width < 1920 && width > 1280) return 'laptop';
    if (width >= 1920) return 'desktop';
}

const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`;
    if(theme === 'dark') return 'dark';

    // const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    // if (userMedia.matches) return 'light';

    return 'light';
};

const initialState: State = {
    theme: getTheme(),
    screen: 'desktop'
};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<'dark' | 'light'>) {
            state.theme = action.payload;
        },
        changeScreen(state, action: PayloadAction<number>) {
            state.screen = changeScreenType(action.payload)
        }
    },
});

export const { changeTheme, changeScreen } = UISlice.actions;

export default UISlice.reducer;
