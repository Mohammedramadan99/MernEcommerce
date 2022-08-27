import React from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function SwiperCarousel({ items })
{
    console.log(items)
    return (
        <div className="swiper-container">
            <div className="animation">
                {items?.length > 0 && (
                    <Swiper
                        navigation={true}
                        effect={"coverflow"}
                        centeredSlides={true}
                        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
                        loop={true}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true
                        }}
                        pagination={{
                            clickable: true
                        }}
                    >
                        {items && items.map(p => (
                            // ${p.activeClass ? 'active' : 'hidden'}
                            <SwiperSlide >
                                <Link to={`/product/${p._id}`}>
                                    <img src={p.images[0].url} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}
