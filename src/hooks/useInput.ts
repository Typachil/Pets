import { ChangeEvent, useEffect, useState } from 'react';

interface ValidationType{
    minLength?: number,
    isEmpty?: boolean,
    isTel?: boolean,
    isEmail?: boolean
}

const useValidation = (value : string, validations : ValidationType = {isEmpty: true}, isDirty: boolean) => {
    const [inputValid, setInputValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if(isDirty){
            for (const validation in validations) {
                switch (validation) {
                    case 'minLength':
                        value.length < validations[validation] ? 
                            setErrorMessage(`Введите не меньше ${validations[validation]} символов`): 
                            setErrorMessage(null)
                        break;
                    case 'isEmpty':
                        value ? setErrorMessage(null) : setErrorMessage(`Поле не должно быть пустым`)
                        break;
                    case 'isTel':
                        const regExpTel = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                        regExpTel.test(String(value).toLowerCase()) ?
                            setErrorMessage(null):
                            setErrorMessage("Введите корректный номер телефона")
                        break;
                    case 'isEmail':
                        const regExpEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/im;
                        regExpEmail.test(String(value).toLowerCase()) ? 
                            setErrorMessage(null):
                            setErrorMessage("Введите корректный email")
                        break;
                    default:
                        break;
                }
            }
        }
    }, [value, validations, isDirty])

    useEffect(() => {
        if (errorMessage || !isDirty) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [errorMessage, isDirty])

    return {
        errorMessage,
        inputValid
    }
}

export default function useInput(initialValue : string, validations? : ValidationType) {
    const [value, setValue] = useState<string>(initialValue);
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations, isDirty);

    const onChange = (e : ChangeEvent <HTMLInputElement>) => {
        setValue(e?.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    const clearValue = () => {
        setValue("")
        setDirty(false)
    }

    return {
        value,
        onChange,
        onBlur,
        clearValue,
        ...valid
    }
}
