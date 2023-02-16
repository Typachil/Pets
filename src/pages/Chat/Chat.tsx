import React from 'react';
import './Chat.scss';
import ChatList from '../../components/ChatList/ChatList';
import ChatPanel from '../../components/ChatPanel/ChatPanel';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useAppSelector } from '../../hooks/redux';
import { addDoc, collection } from 'firebase/firestore';

export default function Chat() {
    const { user } = useAppSelector((state) => state.reducerUser);

    const [messages, loading] = useCollectionData(collection(db, 'messages'));

    console.log(messages);

    const sendMessages = async () => {
        await addDoc(collection(db, 'messages'), {
            name: user.name,
            email: user.email,
            id: user.id,
            text: "test, test",
            createdAt: new Date()
        });
    };

    sendMessages()

    return (
        <div className='chat'>
            <ChatList />
            <ChatPanel />
        </div>
    );
}
