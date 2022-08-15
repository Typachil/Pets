import React, { FC } from 'react';
import './Radio.scss';
import classNames from 'classnames';

interface IRadioProps {
    value: string;
    name: string;
    classes?: string;
}

const Radio: FC<IRadioProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    value,
    name,
    classes,
    ...attrs
}) => {
    let computedClasses = classNames('custom-radio', classes)

    return (
        <label className={computedClasses}>
            <input type='radio' name={name} value={value} {...(attrs as React.InputHTMLAttributes<HTMLInputElement>)}/>
            <span></span>
        </label>
    );
};

export default Radio;
