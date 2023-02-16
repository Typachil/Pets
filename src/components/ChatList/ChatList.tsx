import React from 'react';
import Avatar from '../UI/Avatar/Avatar';
import './ChatList.scss';
import EditIcon from '../../assets/Edit.svg';
import SearchIcon from '../../assets/Search.svg';

export default function ChatList() {
  return (
    <div className='chat-list'>
        <div className='chat-list__header'>
            <label className='chat-list__search'>
                <SearchIcon />
                <input type='text' placeholder='Поиск...'/>
            </label>
            <button className='chat-list__create-talk'><EditIcon /></button>
        </div>
        <div className='chat-list__dialog'>
            <div className='chat-list__user'>
                <Avatar name="Ynfan" size='md'/>
                <div className='chat-list__user-info'>
                    <div className='chat-list__user-name'>Ynfan</div>
                    <div className='chat-list__user-message'>Fassaffasf</div>
                </div>
                <div className='chat-list__user-time'>17:20</div>
            </div>
            <div className='chat-list__user'>
                <Avatar name="Danil" size='md'/>
                <div className='chat-list__user-info'>
                    <div className='chat-list__user-name'>Danil</div>
                    <div className='chat-list__user-message'>Fassaffasf</div>
                </div>
                <div className='chat-list__user-time'>17:20</div>
            </div>
        </div>
    </div>
  )
}
