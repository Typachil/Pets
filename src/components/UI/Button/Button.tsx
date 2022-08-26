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
    size?: 'big' | 'medium';
    children: React.ReactNode;
}

const Button: FC<IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
    classes, 
    href, 
    disabled, 
    loading,
    onClick,
    size = 'big', 
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
            onClick={onClick} 
            className={computedClasses} 
            disabled={disabled}
            {...(attrs as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {loading ?
                '...':
                children
            }
        </button>
    )
};

export default Button;
