import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPetPage } from '../../store/reducers/reducerPets';
import GeoIcon from '../../assets/Geo.svg';
import LikeIcon from '../../assets/Like.svg';
import MoneyIcon from '../../assets/Money.svg';
import './PetsDetail.scss';

import "swiper/scss/pagination";
import calculateAge from '../../hooks/calculateAge';
import Button from '../../components/UI/Button/Button';
import SearchBar from '../../components/UI/SearchBar/SearchBar';

export default function PetsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { screen } = useAppSelector(state => state.reducerUI)
    const dispatch = useAppDispatch();
    const { petPage, pets, groups } = useAppSelector((state) => state.reducerPets);
    const typeName = groups?.filter((item) => item.id === petPage?.groupID)[0]?.name;
    const agePet = new Date().getFullYear() - new Date(petPage?.age).getFullYear();

    useEffect(() => {
        dispatch(setPetPage(Number(id)));
    }, [id, pets]);

    return (
        <div className='pet-detail'>
            <div className='pet-detail__swiper'>
                {screen === 'tablet' || screen === 'mobile' ? 
                    <SearchBar classes='pet-detail__back-history' onClick={() => navigate(-1)}/> 
                    : null}
                {petPage?.images.length > 1 ? (
                    <Swiper
                        effect={ screen === 'desktop' || screen === 'laptop' ? 'coverflow' : 'slide'}
                        grabCursor={true}
                        navigation={ screen === 'desktop' || screen === 'laptop' ? true : false }
                        centeredSlides={true}
                        slidesPerView={screen === 'desktop' || screen === 'laptop' ? 2 : 1}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: screen === 'desktop' ? 200 : 300,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}>
                        {petPage?.images.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className='pet-detail__swiper-slide'>
                                    <img src={item} alt='Фото питомца'></img>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <img className='pet-detail__pet-img' src={petPage?.images[0]} alt='Фото питомца'></img>
                )}
            </div>
            <div className='pet-detail__info'>
                <div className='pet-detail__info-header'>
                    <section>
                        <h2 className='pet-detail__info-name'>{petPage?.name},</h2>
                        <GeoIcon className='pet-detail__geo-icon' viewBox="5 0 55 65"/>
                        <h2 className='pet-detail__info-location'>{petPage?.location}</h2>
                    </section>
                    <section className='pet-detail__info-type'>
                        <span>{petPage?.type}</span>
                        <span className='pet-detail__info-dot'></span>
                        <span>{calculateAge(typeName, petPage?.age, petPage?.sex)}</span>
                    </section>
                    <section>
                        <span className='pet-detail__info-likes'><LikeIcon viewBox="0 -2 15 20"/> {petPage?.likes} Лайка</span>
                        {petPage?.price ? <span><MoneyIcon /> {petPage.price} &#8381;</span> : null}
                    </section>
                </div>
                <div className='pet-detail__info-stats'>
                    <dl>
                        <dt>Возраст</dt>
                        <dd>{agePet} года</dd>
                    </dl>
                    <dl>
                        <dt>Вес</dt>
                        <dd>{petPage?.weight} кг</dd>
                    </dl>
                    <dl>
                        <dt>Пол</dt>
                        <dd>{petPage?.sex ? 'Мужской' : 'Женский'}</dd>
                    </dl>
                </div>
                <div className='pet-detail__info-desc'>
                    <span>Описание</span>
                    <p>{petPage?.about}</p>
                </div>
                {petPage?.adopt ? <Button classes='pet-detail__info-button'>{petPage?.price ? `Купить - ${petPage?.price} ₽` : 'Приютить'}</Button> : null}
            </div>
        </div>
    );
}
