import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img_1 from '../../../Imgs/dress_1.png'
import img_2 from '../../../Imgs/dress_2.png'
import img_3 from '../../../Imgs/shose_5.png'

export default function Features()
{
  const [data, setData] = useState([
    {
      title: "relaxed fit overShirt",
      spanTxt: "discount 20%",
      img: 'https://res.cloudinary.com/dtmjc8y9z/image/upload/v1652988621/ecommerce/e7hipxnks4fcewc9ysjx.png',
      animation: `fade-right`
    },
    {
      title: "discount 20% all time",
      spanTxt: "100% leather handmade",
      img: img_2,
      animation: `fade-down`
    },
    {
      title: "get 20% off",
      spanTxt: "download app",
      img: img_3,
      animation: `fade-left`
    },
  ])
  return (
    <div className='features'>
      <div className="container">
        {data.map(feat => (
          <Link to="#" className="item" data-aos={feat.animation}>
            <div className="left">
              <div className="h3"> {feat.title} </div>
              <span> {feat.spanTxt} </span>
            </div>
            <div className="right">
              <div className="img">
                <img src={feat.img} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


