import React, { useState } from 'react';
import './ChatPanel.scss';
import ChatIcon from '../../assets/Chat.svg';
import StashIcon from '../../assets/Stash.svg';
import AttachIcon from '../../assets/Attach.svg';
import SendIcon from '../../assets/Send.svg';
import SmileIcon from '../../assets/Smile.svg';
import Avatar from '../UI/Avatar/Avatar';
import { setDoc, doc, serverTimestamp, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppSelector } from '../../hooks/redux';

export default function ChatPanel() {
    const { user } = useAppSelector((state) => state.reducerUser);
    const { currentDialog } = useAppSelector((state) => state.reducerPets)
    const [message, setMessage] = useState("")

    const sendMessages = async () => {
        await addDoc(collection(db, 'messages', `${currentDialog == user.id ? currentDialog : currentDialog + "&" + user.id}`, "messages"), {
            name: user.name,
            email: user.email,
            id: user.id,
            text: message,
            createdAt: serverTimestamp()
        });
        // await updateDoc(doc(db, 'users', user.id, currentDialog, user.id), {
        //     timeMessage: serverTimestamp(),
        //     text: message
        // })
        setMessage("");
    };

    return (
        <div className='chat-panel'>
            <div className='chat-panel__header'>
                <div className='chat-panel__header-name'>Ynfan</div>
                <button className='chat-panel__header-stash'>
                    <StashIcon />
                </button>
            </div>
            <div className='chat-panel__messages'>
                <div className='message-friend message-block'>
                    <Avatar size='sm' name='Ynfan' classes='message-avatar' />
                    <div className='message-friend__body'>
                        <div className='message-friend__text'>Привет!</div>
                        <div className='message-friend__time'>17:20</div>
                    </div>
                </div>
                <div className='message-my message-block'>
                    <div className='message-my__body'>
                        <div className='message-my__text'>Привет, как жизнь?</div>
                        <div className='message-my__time'>17:20</div>
                    </div>
                </div>
                <div className='message-friend message-block'>
                    <Avatar size='sm' name='Ynfan' classes='message-avatar' />
                    <div className='message-friend__body'>
                        <div className='message-friend__text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                            aliquam minima placeat! Eum, obcaecati soluta quibusdam in impedit nihil
                            neque doloribus odit minima ipsam, quis, quasi quae a nisi tempore.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea rem, omnis
                            dolorum consequatur vel necessitatibus, explicabo ipsum aut tempore
                            eligendi asperiores id deleniti incidunt facere dignissimos quia aliquid
                            eveniet ad.
                        </div>
                        <div className='message-friend__time'>17:20</div>
                    </div>
                </div>
                <div className='message-my message-block'>
                    <div className='message-my__body'>
                        <div className='message-my__text'>Привет, как жизнь?</div>
                        <div className='message-my__time'>17:20</div>
                    </div>
                </div>
                <div className='message-friend message-block'>
                    <Avatar size='sm' name='Ynfan' classes='message-avatar' />
                    <div className='message-friend__body'>
                        <div className='message-friend__text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                            aliquam minima placeat! Eum, obcaecati soluta quibusdam in impedit nihil
                            neque doloribus odit minima ipsam, quis, quasi quae a nisi tempore.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea rem, omnis
                            dolorum consequatur vel necessitatibus, explicabo ipsum aut tempore
                            eligendi asperiores id deleniti incidunt facere dignissimos quia aliquid
                            eveniet ad.
                        </div>
                        <div className='message-friend__time'>17:20</div>
                    </div>
                </div>
                <div className='message-friend message-block'>
                    <Avatar size='sm' name='Ynfan' classes='message-avatar' />
                    <div className='message-friend__body'>
                        <div className='message-friend__text'>Lorem ipsum</div>
                        <div className='message-friend__time'>17:20</div>
                    </div>
                </div>
                <div className='message-my message-block'>
                    <div className='message-my__body'>
                        <div className='message-my__text'>Привет, как жизнь?</div>
                        <div className='message-my__time'>17:20</div>
                    </div>
                </div>
            </div>
            <div className='chat-panel__footer'>
                <button className='chat-panel__footer-attach'>
                    <AttachIcon />
                </button>
                <input type='text' placeholder='Написать сообщение...' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                <button className='chat-panel__footer-smile'>
                    <SmileIcon />
                </button>
                <button className='chat-panel__footer-send' onClick={sendMessages}>
                    <SendIcon />
                </button>
            </div>
            {/* <div className='chat-panel__empty'>
            <div>
                <ChatIcon />
                <p>Выберите чат <br/> или <span>создайте новую беседу</span></p>
            </div>
        </div> */}
        </div>
    );
}
