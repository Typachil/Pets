import React, { FC } from 'react';
import './Button.scss';
import classNames from 'classnames';

interface IButtonProps {
    classes?: string;
    href?: string;
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    size: "big" | "medium";
}

const Button: FC<IButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
    classes, 
    href, 
    children, 
    disabled, 
    loading,
    size, 
    ...attrs 
}) => {

    let computedClasses = classNames('btn',{
        'btn_big-size': size === 'big',
        'btn_medium-size': size === 'medium',
        'btn_disabled': disabled,
    }, classes)

    return (
        <button type={'button'} 
            {...(attrs as React.ButtonHTMLAttributes<HTMLButtonElement>)} 
            className={computedClasses} 
            disabled={disabled}>
            {loading 
                ?
                '...':
                children
            }
        </button>
    )
};

export default Button;
