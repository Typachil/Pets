import React, { FC } from 'react';
import './Input.scss';
import classNames from 'classnames';

interface IInputProps {
    classes?: string;
    label?: string;
    errorMessage: string;
    valid: boolean;
    value: string;
    onChange: () => void;
}

const Input: FC<IInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    classes, 
    label, 
    errorMessage, 
    valid, 
    value, 
    onChange, 
    ...attrs 
}) => {
    let computedClasses = classNames('label-default',{
        "label-default_valid": valid,
        "label-default_error": errorMessage
    }, classes)
        
    return (
        <label className={computedClasses} >
            {label && <div className='label-default__text'>{label}</div>}
            <input type='text' value={value}
                className='label-default__input' 
                onChange={onChange} 
                {...(attrs as React.InputHTMLAttributes<HTMLInputElement>)}/>
            {errorMessage && <div className='label-default__message-error'>{errorMessage}</div>}
        </label>
    );
};

export default Input;
