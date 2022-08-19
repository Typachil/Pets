import React, { FC } from 'react';
import './Select.scss';
import classNames from 'classnames';

export interface ISelectItemProps {
    classes?: string;
    onChange?: () => void;
    disabled?: boolean;
    selectedValue?: string
    name?: string;
    value: string;
    children: React.ReactNode;
}

const SelectItem: FC<ISelectItemProps & React.LabelHTMLAttributes<HTMLLabelElement>> = ({
    classes,   
    value,
    children,
    disabled,
    selectedValue, 
    name,
    onChange, 
    ...attrs 
}) => {
    let computedClasses = classNames('__select-label',
    {
        "__select-label_checked": value === selectedValue,
        "__select-label_disabled": disabled

    }, classes)
        
    return (
        <label className={computedClasses} {...attrs}>
            <input disabled={disabled} type="radio" name={name} value={value} className='__select-input'/>
            {children}
        </label>
    );
};

export default SelectItem;