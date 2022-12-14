import React, { FC, useState } from 'react';
import './Select.scss';
import classNames from 'classnames';
import { ISelectItemProps } from './SelectItem';

interface ISelectProps {
    name: string
    value: string;
    children?: React.ReactElement[];
    classes?: string;
    label?: string;
    onChange?: (e: React.MouseEventHandler<HTMLDivElement>) => void;
    theme?: 'light' | 'dark';
}

const Select: FC<ISelectProps & React.HTMLAttributes<HTMLDivElement>> = ({
    classes,
    label,
    value,
    name,
    theme,
    children,
    onChange,
    ...attrs
}) => {
    const [openSelect, setOpenSelect] = useState<boolean>(false);

    let computedClasses = classNames(
        '__select',
        `__select_${theme}-theme`,
        {
            __select_active: openSelect,
        },
        classes
    );

    return (
        <div className={computedClasses} onClick={() => setOpenSelect(!openSelect)} {...attrs}>
            {label && <div className='__select-text'>{label}</div>}
            <div className='__select-title'>{value}</div>
            <div className='__select-content' onChange={onChange}>
                {React.Children.map(children, (child : React.ReactElement, i) => {
                    return React.cloneElement(child, {
                        selectedValue: value,
                        name: name
                    })
                })}
            </div>
        </div>
    );
};

export default Select;
