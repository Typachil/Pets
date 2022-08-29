import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { changeScreen } from './store/reducers/reducerUI';
import PageError from './pages/404 Page/PageError';
import Blog from './pages/Blog/Blog';
import Chat from './pages/Chat/Chat';
import Home from './pages/Home/Home';
import Pets from './pages/Pets/Pets';
import PetsDetail from './pages/PetsDetail/PetsDetail';
import Profile from './pages/Profile/Profile';
import StartScreen from './pages/StartScreen/StartScreen';
import RegisterPage from './pages/AuthPage/RegisterPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { BLOG_ROUTE, CHAT_ROUTE, ERROR_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PETS_DETAIL, PETS_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from './utils/constRoutes';
import { useGetPetsQuery, useGetPostsQuery, useGetStatisticQuery } from './store/services/PetsService';

export default function App() {
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.reducerUI);
    useGetPetsQuery();
    useGetPostsQuery();
    useGetStatisticQuery();
    
    const subscribeChangeScreen = () =>{
        dispatch(changeScreen(window.innerWidth))
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        dispatch(changeScreen(window.innerWidth))
        window.addEventListener('resize', subscribeChangeScreen)

        return (
            () => window.removeEventListener('resize', subscribeChangeScreen)
        )
    }, [])

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={HOME_ROUTE.path} element={<Home />} />
                <Route path={PETS_ROUTE.path} element={<Pets />} />
                <Route path={PETS_DETAIL.path} element={<PetsDetail />} />
                <Route path={PROFILE_ROUTE.path} element={<Profile />} />
                <Route path={CHAT_ROUTE.path} element={<Chat />} />
                <Route path={BLOG_ROUTE.path} element={<Blog />} />
                <Route path={ERROR_ROUTE.path} element={<PageError />} />
            </Route>
            <Route path={START_ROUTE} element={<StartScreen />} />
            <Route path={LOGIN_ROUTE} element={<AuthPage />} />
            <Route path={REGISTRATION_ROUTE} element={<RegisterPage />} />
        </Routes>
    );
}
