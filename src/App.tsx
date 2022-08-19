import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PageError from './pages/404 Page/PageError';
import AuthPage from './pages/AuthPage/AuthPage';
import Blog from './pages/Blog/Blog';
import Chat from './pages/Chat/Chat';
import Main from './pages/Main/Main';
import Pets from './pages/Pets/Pets';
import PetsDetail from './pages/PetsDetail/PetsDetail';
import StartScreen from './pages/StartScreen/StartScreen';

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="pets" element={<Pets />} />
                <Route path="pets:id" element={<PetsDetail />} />
                <Route path="profile" element={<PetsDetail />} />
                <Route path="chat" element={<Chat />} />
                <Route path="blog" element={<Blog />} />
                <Route path="*" element={<PageError />} />
            </Route>
            <Route path='/start' element={<StartScreen />} />
            <Route path='/auth' element={<AuthPage />} />
        </Routes>
    );
}
