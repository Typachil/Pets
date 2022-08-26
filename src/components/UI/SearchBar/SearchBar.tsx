import React, { FC } from 'react';
import './SearchBar.scss';
import classNames from 'classnames';

interface ISearchBarProps {
    classes?: string;
    theme?: 'light' | 'dark';
    onClick?: () => void;
}

const SearchBar:FC<ISearchBarProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    theme,
    classes,
    onClick,
    ...attrs
}) => {
    let computedClasses = classNames('search-bar', `search-bar_${theme}-theme`, classes)
    return (
        <button onClick={onClick} className={computedClasses} {...attrs}></button>
    )
};

export default SearchBar;
