import React, { FC } from 'react';
import './Button.scss';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';

interface IButtonProps {
    classes?: string;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    size: "big" | "medium";
}

const Button: FC<IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
    classes, 
    href, 
    disabled, 
    loading,
    onClick,
    size, 
    children,
    ...attrs 
}) => {

    let computedClasses = classNames('btn',{
        [`btn_${size}-size`]: size,
        'btn_disabled': disabled,
    }, classes)

    if(href){
        return (
            <NavLink {...(attrs as React.AnchorHTMLAttributes<HTMLAnchorElement>)} to={href} className={computedClasses}>
                {loading ?
                    '...':
                    children
                }
            </NavLink>
        )
    }

    return (
        <button type={'button'} 
            {...(attrs as React.ButtonHTMLAttributes<HTMLButtonElement>)} 
            className={computedClasses} 
            disabled={disabled}>
            {loading ?
                '...':
                children
            }
        </button>
    )
};

export default Button;
