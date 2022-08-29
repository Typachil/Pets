import React, { FC } from 'react';
import './Checkbox.scss';
import classNames from 'classnames';

interface ICheckboxProps {
    classes?: string;
    onChange?: () => void;
    variant?: 'standart' | 'theme'
    checked: boolean;
}

const Checkbox: FC<ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes,
    checked,
    variant = 'standart',
    onChange,
    ...attrs
}) => {
    let computedClasses = classNames('custom-checkbox', {
        'custom-checkbox__theme-checbox': variant === 'theme'
    }, classes)

    return (
        <>
            <label className={computedClasses}>
                <input type='checkbox' onClick={onChange} checked={checked} {...attrs}/>
                <span></span>
                <div></div>
            </label>
        </>
    );
};

export default Checkbox;
