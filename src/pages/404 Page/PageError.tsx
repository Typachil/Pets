import React, { useMemo } from 'react';
import getRandomInt from '../../hooks/getRandomInt';
import './PageError.scss';

export default function () {
    const arrayError = [
        {
            heading: 'Is That A Dragon?',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursusvitae aliquam ut diam, facilisis.',
            img: 'Dragon.svg',
        },
        {
            heading: 'Ugh I Just Break It !',
            text: 'Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow, Meow ',
            img: 'Cat_sad.svg',
        },
        {
            heading: 'This Thing Is Broken',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursusvitae aliquam ut diam, facilisis.',
            img: 'Cat_angry.svg',
        },
        {
            heading: 'Looking Sad Bae ?',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra integer vel quam amet eget. Massa nec nam molestie urna, iaculis sed. Dui tincidunt pharetra sagittis, massa lectus nullam viverra. Commodo sapien ornare cursusvitae aliquam ut diam, facilisis.',
            img: 'Dog.svg',
        },
    ];
    
    const memoGetRandomInt = useMemo(() => getRandomInt(1, 4), [])
    const {heading, text, img} = arrayError[memoGetRandomInt]

    return (
        <div className='page-error'>
            <div className='page-error__wrapper'>
                <img src={`/img/404/${img}`} alt='Error' />
                <h1>{heading}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
}
