import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, Pet, Post, Statistic } from "../models/Pets";
import { petsAPI } from "../services/PetsService";

export interface State{
    posts: Post[] | null;
    pets: Pet[] | null;
    statistic: Statistic[] | null;
    groups: Group[] | null;
    limitPets: Pet[] | null;
    petPage: Pet | null;
    currentDialog: string | null;
}

const initialState: State = {
    posts: null,
    pets: null,
    statistic: null,
    groups: null,
    limitPets: null,
    petPage: null,
    currentDialog: null
}

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        setLimitPets(state, action : PayloadAction<Pet[]>){
            // const lengthPets = state.limitPets?.length || 0;
            // const limit = lengthPets >= action.payload ? lengthPets + action.payload : action.payload;
            // state.limitPets = state.pets?.slice(0, limit)
            state.limitPets = action.payload         
        },
        setPetPage(state, action: PayloadAction<number>){
            state.petPage = state.pets?.find(item => item.id === action.payload)
        },
        setCurrentDialog(state, action: PayloadAction<string>){
            state.currentDialog = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            petsAPI.endpoints.getPets.matchFulfilled,
            (state, {payload}) => {
                state.pets = Object.values(payload).map((item, index) => {
                    item.id = index + 1
                    return item;
                })
            }
        ),
        builder.addMatcher(
            petsAPI.endpoints.getPosts.matchFulfilled,
            (state, {payload}) => {
                state.posts = payload
            }
        ),
        builder.addMatcher(
            petsAPI.endpoints.getStatistic.matchFulfilled,
            (state, {payload}) => {
                state.statistic = payload
            }
        )
        builder.addMatcher(
            petsAPI.endpoints.getGroups.matchFulfilled,
            (state, {payload}) => {
                state.groups = payload
            }
        )
    }
})

export const {setLimitPets, setPetPage, setCurrentDialog} = petsSlice.actions;

export default petsSlice.reducer;