import React, { FC } from 'react';
import './Avatar.scss';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';

interface IAvatarProps {
    href?: string;
    classes?: string;
    isOnline?: boolean;
    img?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    name?: string;
}

const Avatar:FC<IAvatarProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
    href,
    classes,
    size = 'lg',
    img,
    name,
    isOnline,
    ...attrs
}) => {
    let computedClasses = classNames('avatar',{
        [`avatar_size-${size}`]: size
    }, classes)

    if(name){
        let splitName:string[] = name.trim().toUpperCase().split(" ");
        name = "";
        if(splitName.length >= 2) splitName.forEach(item => name += item.slice(0, 1));
        if(splitName.length === 1) name = splitName.join("").slice(0, 2);
    }

    if(href){
        return (
            <NavLink {...(attrs as React.AnchorHTMLAttributes<HTMLAnchorElement>)} to={href} className={computedClasses}>
                {isOnline && <div className='avatar__online'></div>}
                <div className='avatar__children'>{img ? <img src={img} alt="avatar"/> : name}</div>
            </NavLink>
        )
    }

    return (
        <button className={computedClasses} {...(attrs as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {isOnline && <div className='avatar__online'></div>}
            <div className='avatar__children'>{img ? <img src={img} alt="avatar"/> : name}</div>
        </button>
    )
};

export default Avatar;