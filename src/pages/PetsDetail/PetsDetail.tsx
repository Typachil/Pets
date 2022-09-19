import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPetPage } from '../../store/reducers/reducerPets';
import './PetsDetail.scss';

import "swiper/scss/pagination";

export default function PetsDetail() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { petPage, pets } = useAppSelector((state) => state.reducerPets);

    useEffect(() => {
        dispatch(setPetPage(Number(id)));
    }, [id, pets]);

    console.log(petPage);

    return (
        <div className='pet-detail'>
            <div className='pet-detail__swiper'>
                {petPage?.images.length > 1 ? (
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={2}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[EffectCoverflow, Pagination]}>
                        {petPage?.images.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className='pet-detail__swiper-slide'>
                                    <img src={item} alt='Фото питомца'></img>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <img src={petPage?.images[0]} alt='Фото питомца'></img>
                )}
            </div>
            <div className='pet-detail__info'>
                  {petPage?.name}
            </div>
        </div>
    );
}
