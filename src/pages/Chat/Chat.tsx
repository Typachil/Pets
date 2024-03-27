import React from 'react';
import './Chat.scss';
import ChatList from '../../components/ChatList/ChatList';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Chat() {

    return (
        <div className='chat'>
            <ChatList/>
            <ChatPanel />
        </div>
    );
}
