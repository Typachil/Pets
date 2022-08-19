import React, { FC } from 'react';
import './Radio.scss';
import classNames from 'classnames';

interface IRadioGroupProps {
    value: string;
    name: string;
    onChange?: (e: any) => void;
    classes?: string;
    children?: React.ReactElement[];
}

const RadioGroup: FC<IRadioGroupProps & React.HTMLAttributes<HTMLDivElement>> = ({
    value,
    name,
    classes,
    onChange,
    children,
    ...attrs
}) => {
    let computedClasses = classNames('radio-group', classes)

    return (
        <div className={computedClasses} onClick={onChange} {...attrs}>
            {React.Children.map(children, (child : React.ReactElement, i) => {
                    return React.cloneElement(child, {
                        currentValue: value,
                        name: name
                    })
            })}
        </div>
    );
};

export default RadioGroup;