import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PetCard from '../../components/PetCard/PetCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { groupNames, groupNamesType } from '../../utils/GroupNames';
import './Pets.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';

export default function Pets() {
    const { pets, groups } = useAppSelector((state) => state.reducerPets);
    const { screen } = useAppSelector((state) => state.reducerUI);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [formattedGroups, setFormattedGroups] = useState<Array<groupNamesType> | null>(null);
    const [limitPagePets, setLimitPagePets] = useState<number>(0);

    const filterQuery = searchParams.get('filter') || null;

    useEffect(() => {
        if (screen === 'mobile' || screen === 'tablet') {
            setLimitPagePets(3);
        } else {
            setLimitPagePets(10);
        }
    }, [screen]);

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

    const changeFilter = (searchValue: string) => {
        const filterArray = new Set(filterQuery?.split('-'));
        if (filterArray.has(searchValue)) {
            filterArray.delete(searchValue);
        } else {
            filterArray.add(searchValue);
        }
        setSearchParams({ filter: [...filterArray].join('-') });
    };

    const filteredGroup = formattedGroups?.map((item: groupNamesType) => {
        const activeGroup = searchParams.get('filter')?.split('-').includes(item.search);
        const elem = (
            <button
                onClick={() => changeFilter(item.search)}
                className={`pets-page__group-item ${activeGroup && 'pets-page__group-item_active'}`}
                key={item.id}>
                <div
                    className={`pets-page__item-icon pets-page__item-icon_backround-${item.search}`}></div>
                <span>{item.name}</span>
            </button>
        );
        if (screen === 'mobile') return <SwiperSlide>{elem}</SwiperSlide>;
        return elem;
    });

    return (
        <div className='pets-page'>
            <div className='pets-page__group'>
                {screen === 'mobile' ? (
                    <Swiper slidesPerView={3} spaceBetween={20}>
                        {filteredGroup}
                    </Swiper>
                ) : (
                    filteredGroup
                )}
            </div>
            <InfiniteScroll limit={limitPagePets}>
                {pets
                    ?.filter((item) => {
                        if (filterQuery) {
                            return filterQuery?.includes(
                                formattedGroups?.find((group) => group.id === item.groupID).search
                            );
                        } else {
                            return true;
                        }
                    })
                    .map((item) => {
                        return (
                            <PetCard classes='pets-page__masonry-item' key={item.id} {...item} />
                        );
                    })}
            </InfiniteScroll>
        </div>
    );
}
