import React from 'react'
import { Link } from 'react-router-dom'
import LandingImg from '../../../Imgs/coat_2.png'
export const LandingPage = () =>
{
    return (
        <section className="landing">
            <div className="container">
                <div className="intro" data-aos="fade-right">
                    <p>deal of today</p>
                    <h1>don't waste the chances, great deals. for you.</h1>
                    <div className="links">
                        <Link to="#"> explore </Link>
                        <Link to="#"> shop now </Link>
                    </div>
                </div>
                <div className="img" data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500">
                    <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1656761530/ecommerce/jk9uk8cy5hg6xofsts3y.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default LandingPage