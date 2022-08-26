import React, { FC } from 'react';
import './Checkbox.scss';
import classNames from 'classnames';

interface ICheckboxProps {
    classes?: string;
    onClick?: () => void;
    variant?: 'standart' | 'theme'
    checked: boolean;
}

const Checkbox: FC<ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes,
    checked,
    variant = 'standart',
    onClick,
    ...attrs
}) => {
    let computedClasses = classNames('custom-checkbox', {
        'custom-checkbox__theme-checbox': variant === 'theme'
    }, classes)

    return (
        <>
            <label className={computedClasses}>
                <input type='checkbox' onClick={onClick} checked={checked} {...attrs}/>
                <span></span>
                <div></div>
            </label>
        </>
    );
};

export default Checkbox;
