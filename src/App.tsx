import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import Avatar from './components/UI/Avatar/Avatar';
import Button from './components/UI/Button/Button';
import Checkbox from './components/UI/Checkbox/Checkbox';
import Input from './components/UI/Input/Input';
import Logo from './components/UI/Logo/Logo';
import Radio from './components/UI/Radio/Radio';
import RadioGroup from './components/UI/Radio/RadioGroup';
import SearchBar from './components/UI/SearchBar/SearchBar';
import Select from './components/UI/Select/Select';
import SelectItem from './components/UI/Select/SelectItem';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import './index.scss';
import { changeTheme } from './store/reducers/reducerUI';

export default function App() {
    const { darkTheme } = useAppSelector((state) => state.reducerUI);
    const dispatch = useAppDispatch();

    const [selectValue, setSelectValue] = useState('Введите что нить');
    const [valueRadio, setValueRadio] = useState('male');
    const changeValueSelect = (e: any) => {
        setSelectValue(e.target.value);
    };

    return (
        <div className={darkTheme ? 'body-dark app' : 'body-light app'}>
            <h1>Pets</h1>
            <h1>Животные</h1>
            <Button size={'big'}>Кнопка</Button>
            <div>
                <Input
                    label='label'
                    errorMessage=''
                    valid={false}
                    value='Label'
                    darkTheme={darkTheme}
                    onChange={() => console.log('Работает')}
                />
            </div>
            <div>
                <RadioGroup name='Sex' value={valueRadio} onChange={(e: any) => setValueRadio(e.target.value)}>
                    <Radio darkTheme={darkTheme} value='male' label="Мужчина"/>
                    <Radio darkTheme={darkTheme} value='female' label="Женщина"/>
                </RadioGroup>
            </div>
            <div>
                <Checkbox checked={!darkTheme} onClick={() => dispatch(changeTheme(!darkTheme))} />
            </div>
            <div>
                <Logo size='lg' darkTheme={darkTheme} />
            </div>
            <div>
                <SearchBar darkTheme={darkTheme} />
            </div>
            <div>
                <Avatar name='Nikita ALt' isOnline={true} size='sm' />
                <Avatar name='Nikita' img='img/avatars.jpg' isOnline={true} size='sm' />
            </div>
            <div>
                <Select
                    name='Age'
                    label='Select'
                    value={selectValue}
                    darkTheme={darkTheme}
                    onChange={changeValueSelect}>
                    <SelectItem disabled={true} value='Десять'>
                        Десять
                    </SelectItem>
                    <SelectItem value='Двадцать'>Двадцать</SelectItem>
                    <SelectItem value='Тридцать'>Тридцать</SelectItem>
                    <SelectItem value='Сорок'>Сорок</SelectItem>          
                </Select>
            </div>
        </div>
    );
}
