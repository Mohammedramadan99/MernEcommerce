import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterProducts, getProducts } from '../../../redux/product/productSlice'
import { motion } from 'framer-motion/dist/es/index'
import Spinner from '../../Layout/Spinner'

// swiper slider 
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

export default function Products()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products } = useSelector(state => state.products)
    const { filterProducts } = useSelector(state => state.products)
    const { products: productsFilter, isLoading, isError: filterError, message: filterMessage, isSuccess } = filterProducts
    // const [products,setProducts] = useState(data.products)
    const [listGroup, setListGroup] = useState(['all', 'sneakers', 'dresses', 'coats', 'shirts', 'bags', 'glasses'])
    const [activeList, setActiveList] = useState('all')
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100]);
    const [ratings, setRatings] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [currentProducts, setCurrentProducts] = useState(products)

    const listHandler = (title) =>
    {
        title === 'all' ? setActiveList('all') : setActiveList(title)
        title === 'all' ? setCategory('') : setCategory(title)
    }

    const redirectHandler = id =>
    {
        navigate(`/product/${id}`)
    }
    useEffect(() =>
    {
        const data = { category }
        dispatch(getProducts());
        dispatch(getFilterProducts(data));
    }, [dispatch, category]);

    useEffect(() =>
    {
        setCurrentProducts(productsFilter?.length > 0 ? productsFilter : products)
    }, [currentProducts, productsFilter, products])



    return (
        <div className="products">
            <div className="container">
                <div className="section-title" data-aos="fade-left">
                    all <strong>products</strong>
                </div>
                <div className="carousel-products" >
                    <ul className="list-group list-group-horizontal justify-content-center" data-aos="fade-right">
                        {listGroup.map((item, i) => (
                            <li key={i} className={activeList === item ? `list-group-item active` : `list-group-item`} data-filter={item} onClick={() => listHandler(item)} > {item} </li>
                        ))}
                    </ul>

                    <div className="swiper" data-aos="fade-up">
                        {isLoading ? <Spinner /> : isSuccess && (
                            <div className="swiper-container">
                                <div className="animation">
                                    {productsFilter.length > 0 && (
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
                                            {productsFilter && productsFilter.map(p => (
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
                        )}
                    </div>
                </div>
                <Link to="/products" className="btn">shop now</Link>
            </div>
        </div>
    )
}
