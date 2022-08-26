import React, { FC } from 'react';
import './Radio.scss';
import classNames from 'classnames';

interface IRadioProps {
    value: string;
    theme?: 'light' | 'dark';
    name?: string;
    label?: string;
    currentValue?: string;
    classes?: string;
}

const Radio: FC<IRadioProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    value,
    theme,
    name,
    label,
    currentValue,
    classes,
    ...attrs
}) => {
    let computedClasses = classNames('custom-radio', classes)

    return (
        <label className={computedClasses}>
            <input type='radio'
                checked={currentValue === value? true: false} 
                name={name} 
                value={value} 
                {...attrs}/>
            <span></span>
            <div className={`custom-radio__label ${theme === 'dark' && "custom-radio__label_dark-theme"}`}>{label}</div>
        </label>
    );
};

export default Radio;
