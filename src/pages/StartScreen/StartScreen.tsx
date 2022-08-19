import React, { useState } from 'react';
import Logo from '../../components/UI/Logo/Logo';
import './StartScreen.scss'

export default function StartScreen() {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return (
            <div className='launch-screen'>
                <Logo size='lg' classes='logo_animation'/>
                <div className='launch-screen__text'>Pets</div>
            </div>
        );
    }

    return (
        <div>

        </div>
    )
}
