import React, { useState, useEffect } from 'react'
import data from '../../../data'
import { Link } from 'react-router-dom'
import AOS from 'aos'

export default function Footer()
{
    const [footerData, setFooterData] = useState(data.footerItems)

    useEffect(() =>
    {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <footer className='footer' data-aos="fade-up">
            <div className="container">
                {footerData.groupOne.map(item => (
                    <div className="footer_items">
                        <>
                            <div className="h6"> {item.title} </div>
                            <ul>
                                {item.items?.map((i, indx) => (
                                    <Link key={indx} to={i.catName ? `/products/${i.catName}` : "#"}>
                                        <li> {i.catName ? i.catName : i} </li>
                                    </Link>
                                ))}
                            </ul>
                        </>
                    </div>
                ))}
                <div className="footer_items">
                    <div className='item'>
                        {footerData.groupTwo.map(item => (
                            <>
                                <div className="h6">
                                    {item.title}
                                </div>
                                <ul className='social'>
                                    {item.items.map((i, indx) => (
                                        <Link key={indx} to="#">
                                            <li> {i} </li>
                                        </Link>
                                    ))}
                                </ul>
                            </>
                        ))}
                    </div>
                    <div className='item'>
                        {footerData.groupThree.map((item, i) => (
                            <div key={i}>
                                <div key={i} className="h6">
                                    {item?.title}
                                </div>
                                <div className="img">
                                    <img src={item?.img} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    )
}
