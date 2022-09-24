import React, { FC, forwardRef, LegacyRef, useState } from 'react';
import classNames from 'classnames';
import './PetCard.scss';
import IconLike from '../../assets/Like.svg';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { PETS_DETAIL } from '../../utils/constRoutes';
import calculateAge from '../../hooks/calculateAge';

interface propsPetCard{
    id: number;
    age: string;
    name: string;
    previewImg: string;
    likes: number;
    groupID: number;
    sex: boolean;
    cardRef?: LegacyRef<HTMLDivElement>;
    classes?: string;
}

export type Ref = HTMLDivElement;

const PetCard : FC<propsPetCard> = ({
    id,
    age,
    name,
    previewImg,
    likes,
    groupID,
    sex,
    classes,
    cardRef}
)=> {
    const navigate = useNavigate();
    const [likedPost, setLikedPost] = useState<boolean>(false);
    const {groups} = useAppSelector(state => state.reducerPets);
    const typeName = groups?.filter((item) => item.id === groupID)[0].name;

    const likedPets = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setLikedPost(!likedPost)
    }

    const computedClasses = classNames('pet-card', classes)
    return (
        <div ref={cardRef} className={computedClasses} onClick={() => navigate(PETS_DETAIL.path + `/${id}`)}>
            <img src={previewImg} alt='petImage' />
            <div className='pet-card__info'>
                <div className='pet-card__name'>
                    <h5>{name}</h5>
                    <span>{calculateAge(typeName, age, sex)}</span>
                </div>
                <div className='pet-card__likes'>
                    <span>{likes} лайка</span>
                    <button>
                        <IconLike onClick={likedPets} className={likedPost ? 'pet-card__like-button_clicked' : null} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
