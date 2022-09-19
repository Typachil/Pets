import React, { createRef, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PetCard from '../../components/PetCard/PetCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { groupNames, groupNamesType } from '../../utils/GroupNames';
import Masonry from 'react-masonry-css';
import './Pets.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setLimitPets } from '../../store/reducers/reducerPets';

export default function Pets() {
    const { pets, groups, limitPets } = useAppSelector((state) => state.reducerPets);
    const { screen } = useAppSelector((state) => state.reducerUI);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [formattedGroups, setFormattedGroups] = useState<Array<groupNamesType> | null>(null);
    const [limitPagePets, setLimitPagePets] = useState<number>(null);
    const lastItem = createRef<HTMLDivElement>();
    const observerLoader = useRef(null);

    const filterQuery = searchParams.get('filter') || null;
    const breakpointColumnsObj = {
        2100: 4,
        1600: 3,
        1279: 2,
        767: 1
    };

    useEffect(() => {
        if(screen === 'tablet') setLimitPagePets(5);
        if(screen === 'mobile'){ 
            setLimitPagePets(3)
        }else{
            setLimitPagePets(10)
        }
    }, [screen])

    useEffect(() => {
        dispatch(setLimitPets(limitPagePets))
    }, [pets, limitPagePets])

    useEffect(() => {
        const newGroups = groups?.map((item) => {
            return {
                id: item.id,
                name: item.name,
                search: groupNames[item.id - 1].search,
            };
        });
        setFormattedGroups(newGroups);
    }, [groups]);

    useEffect(() => {
        if (observerLoader.current) observerLoader.current.disconnect();
    
        observerLoader.current = new IntersectionObserver(actionInSight, {
            root: null,
            rootMargin: '5px',
            threshold: 0.5 
        });
        if (lastItem.current) observerLoader.current.observe(lastItem.current);

    }, [lastItem]);

    const actionInSight = (entries : IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && pets.length > limitPets.length) {
            dispatch(setLimitPets(limitPagePets))
        }
    };

    const changeFilter = (searchValue : string) => {
        const filterArray = new Set(filterQuery?.split('-'))
        if(filterArray.has(searchValue)){
            filterArray.delete(searchValue)
        }else{
            filterArray.add(searchValue)
        }
        setSearchParams({filter: [...filterArray].join('-')})
    }

    const filteredGroup = formattedGroups?.map((item: groupNamesType) => {
        const activeGroup = searchParams.get('filter')?.split('-').includes(item.search)
        const elem = <button      
                        onClick={() => changeFilter(item.search)}
                        className={`pets-page__group-item ${activeGroup && 'pets-page__group-item_active'}`}
                        key={item.id}>
                        <div
                            className={`pets-page__item-icon pets-page__item-icon_backround-${item.search}`}></div>
                        <span>{item.name}</span>
                    </button>
        if(screen === 'mobile') return (
            <SwiperSlide>
                {elem}
            </SwiperSlide>
        )
        return elem;
    })

    return (
        <div className='pets-page'>
            <div className='pets-page__group'>
                {screen === 'mobile' ? 
                <Swiper 
                    slidesPerView={3}
                    spaceBetween={20}>
                    {filteredGroup}
                </Swiper> : 
                filteredGroup}
            </div>
            <Masonry 
                className={'pets-page__masonry-grid'}
                columnClassName={'pets-page__masonry-column'} 
                breakpointCols={breakpointColumnsObj}>
                {limitPets?.filter(item => {
                    if(filterQuery){
                        return filterQuery?.includes(formattedGroups?.find(group => group.id === item.groupID).search)
                    }else{
                        return true
                    }})
                    .map((item, index) => {
                        if(index + 1 === limitPets?.length){
                            return (
                                <PetCard classes='pets-page__masonry-item'
                                    key={index}
                                    id={index}
                                    {...item}
                                    ref={lastItem}
                                />
                            )
                        }
                        return (
                            <PetCard classes='pets-page__masonry-item'
                                key={index}
                                id={index}
                                {...item}
                            />
                        )
                })}
            </Masonry>
        </div>
    );
}
