import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Group, Pet, Post, Statistic } from '../models/Pets';

export const petsAPI = createApi({
    reducerPath: 'petsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://yvladandmir.github.io/dataForPets'
    }),
    endpoints: (builder) => ({
        getPets: builder.query<Pet[], void>({
            query: () => '/animals.json'
        }),
        getPosts: builder.query<Post[], void>({
            query: () => '/posts.json'
        }),
        getStatistic: builder.query<Statistic[], void>({
            query: () => '/statistic.json'
        }),
        getGroups: builder.query<Group[], void>({
            query: () => '/groups.json'
        }),
    })
})

export const { useGetPetsQuery, useGetPostsQuery, useGetGroupsQuery, useGetStatisticQuery } = petsAPI;