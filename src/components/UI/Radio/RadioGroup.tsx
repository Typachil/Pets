import React, { FC } from 'react';
import './Radio.scss';
import classNames from 'classnames';

interface IRadioGroupProps {
    value: string;
    name: string;
    onChange: (e: any) => void;
    classes?: string;
    children?: any;
}

const RadioGroup: FC<IRadioGroupProps> = ({
    value,
    name,
    classes,
    onChange,
    children,
    ...attrs
}) => {
    let computedClasses = classNames(classes)

    return (
        <div className={computedClasses} onClick={onChange}>
            {React.Children.map(children, (child, i) => {
                    return React.cloneElement(child, {
                        currentValue: value,
                        name: name
                    })
            })}
        </div>
    );
};

export default RadioGroup;