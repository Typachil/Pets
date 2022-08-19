import React, { FC } from 'react';
import './SearchBar.scss';
import classNames from 'classnames';

interface ISearchBarProps {
    classes?: string;
    darkTheme?: boolean;
    onClick?: () => void;
}

const SearchBar:FC<ISearchBarProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    darkTheme,
    classes,
    onClick,
    ...attrs
}) => {
    let computedClasses = classNames('search-bar',{
        "search-bar_dark-theme": darkTheme,
    }, classes)
    return (
        <button onClick={onClick} className={computedClasses} {...attrs}></button>
    )
};

export default SearchBar;
