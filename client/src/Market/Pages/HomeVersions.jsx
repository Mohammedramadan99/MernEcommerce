import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import img_1 from '../Imgs/coat_1.png'
import img_2 from '../Imgs/coat_2.png'
import img_3 from '../Imgs/coat_3.png'
import img_4 from '../Imgs/coat_4.png'
// * swiper
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
export default function HomeVersions()
{

  return (
    <div className='homeVersions'>
      <div className="container">
        <div className="item">
          <Link to="/home-v1" className="btn--version">
            home 1
          </Link>
          <div className="img">
            <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1655243167/Portfolio/Artboard_1_jb5jhd.png" alt="" />
          </div>
        </div>
        <div className="item">
          <Link to="/home-v2" className="btn--version">
            home 2
          </Link>
          <div className="soon">
            {/* <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1655243167/Portfolio/Artboard_1_jb5jhd.png" alt="" /> */}
            <span>comming</span>
            soon
          </div>

        </div>
      </div>
    </div>
  )
}
