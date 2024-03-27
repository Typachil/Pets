import React, { useEffect } from 'react';
import Avatar from '../UI/Avatar/Avatar';
import './ChatList.scss';
import EditIcon from '../../assets/Edit.svg';
import SearchIcon from '../../assets/Search.svg';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentDialog } from '../../store/reducers/reducerPets';

export default function ChatList() {
    const { currentDialog } = useAppSelector((state) => state.reducerPets);
    const dispatch = useAppDispatch();
    const [users, loadingUsers] = useCollection(collection(db, 'users'));

    useEffect(() => {
        if(!loadingUsers) dispatch(setCurrentDialog(users?.docs[0].id) );
    },[loadingUsers])

    return (
        <div className='chat-list'>
            <div className='chat-list__header'>
                <label className='chat-list__search'>
                    <SearchIcon />
                    <input type='text' placeholder='Поиск...' />
                </label>
                <button className='chat-list__create-talk'>
                    <EditIcon />
                </button>
            </div>
            <div className='chat-list__dialog'>
                {users?.docs.map(user => {
                    const {name, photoURL} = user.data()
                    return(
                        <div key={user.id} className={`chat-list__user ${currentDialog == user.id ? "chat-list__user_active": null}`} onClick={() => dispatch(setCurrentDialog(user.id))}>
                            <Avatar name='Ynfan' size='md' img={photoURL}/>
                            <div className='chat-list__user-info'>
                                <div className='chat-list__user-name'>{name}</div>
                                <div className='chat-list__user-message'>Пока у вас нет сообщений</div>
                            </div>
                            <div className='chat-list__user-time'></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
