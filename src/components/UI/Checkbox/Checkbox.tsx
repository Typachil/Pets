import React, { FC } from 'react';
import './Checkbox.scss';
import classNames from 'classnames';

interface ICheckboxProps {
    classes?: string;
    checked: boolean;
    onClick: () => void;
}

const Checkbox: FC<ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes,
    checked,
    onClick,
    ...attrs
}) => {
    let computedClasses = classNames('custom-checkbox', classes)

    return (
        <>
            <label
                className={computedClasses}
                onClick={onClick}>
                <input type='checkbox' checked={checked} {...(attrs as React.InputHTMLAttributes<HTMLInputElement>)}/>
                <span></span>
            </label>
        </>
    );
};

export default Checkbox;
