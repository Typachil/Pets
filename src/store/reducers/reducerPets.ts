import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, Pet, Post, Statistic } from "../models/Pets";
import { petsAPI } from "../services/PetsService";

export interface State{
    posts: Post[] | null;
    pets: Pet[] | null;
    statistic: Statistic[] | null;
    groups: Group[] | null;
}

const initialState: State = {
    posts: null,
    pets: null,
    statistic: null,
    groups: null
}

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            petsAPI.endpoints.getPets.matchFulfilled,
            (state, {payload}) => {
                state.pets = payload
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

export const {} = petsSlice.actions;

export default petsSlice.reducer;