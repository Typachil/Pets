const calculateAge = (type:string, date: string, sex: boolean) : string => {
    const todayDate = new Date().getFullYear();
    const petDate = new Date(date).getFullYear();
    const agePet = todayDate - petDate;
    
    switch(type){
        case 'Собаки':
            if(agePet <= 1) return 'Щенок';
            if(sex) return 'Пёс';
            return 'Собака'
        case 'Коты':
            if(agePet <= 1) return 'Котенок';
            if(sex) return 'Кот';
            return 'Кошка';
        case 'Зайцы':
            if(agePet <= 1) return 'Зайченок';
            if(sex) return 'Заяц';
            return 'Зайчиха';
        case 'Мыши':
            return 'Мышь';
        case 'Птицы':
            return 'Птичка'
        default: 
            return 'Животное'
    }
}

export default calculateAge;