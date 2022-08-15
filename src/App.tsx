import React from 'react';
import Button from './components/UI/Button/Button';
import Checkbox from './components/UI/Checkbox/Checkbox';
import Input from './components/UI/Input/Input';
import Logo from './components/UI/Logo/Logo';
import Radio from './components/UI/Radio/Radio';
import './index.scss';

export default function App() {
    return (
        <div>
            <h1>Pets</h1>
            <h1>Животные</h1>
            <Button size={'big'}>Кнопка</Button>
            <div>
                <Input
                    label='label'
                    errorMessage=''
                    valid={false}
                    value='Label'
                    onChange={() => console.log('Работает')}
                />
            </div>
            <div>
                <Radio name='Sex' value='male' />
                <Radio name='Sex' value='female' />
            </div>
            <div>
                <Checkbox checked={false} onClick={() => console.log('Checbox')}/>
            </div>
            <div>
              <Logo size='sm'/>
            </div>
        </div>
    );
}
