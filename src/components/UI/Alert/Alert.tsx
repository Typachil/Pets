import React, { FC } from 'react';
import classNames from 'classnames';
import './Alert.scss';
import CheckIcon from '../../../assets/CheckMark.svg';
import ErrorIcon from '../../../assets/Error.svg';

interface IAlertProps {
    variant?: 'success' | 'error' | 'warning';
    children?: React.ReactNode;
    classes?: string;
}

const Alert: FC<IAlertProps & React.HTMLAttributes<HTMLDivElement>> = ({
    variant = 'success',
    children,
    classes,
    ...attrs
}) => {
    let computedClasses = classNames('alert', {
        [`alert_${variant}`] : variant
    }, classes);

    return (
        <div className={computedClasses} {...attrs}>
            <div className='alert-content'>
                {variant === 'success' ? <CheckIcon/> : <ErrorIcon/>}
                {children}
            </div>
        </div>
    );
};

export default Alert;
