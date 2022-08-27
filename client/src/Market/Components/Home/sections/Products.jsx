import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterProducts, getProducts } from '../../../redux/product/productSlice'
import Spinner from '../../Layout/Spinner'
const SwiperCarousel = lazy(() => import('../../SwiperCarousel'))
// swiper slider 

export default function Products()
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { products } = useSelector(state => state.products)
    const { filterProducts } = useSelector(state => state.products)
    const { products: productsFilter, isLoading, isError: filterError, message: filterMessage, isSuccess } = filterProducts
    // const [products,setProducts] = useState(data.products)
    const [listGroup, setListGroup] = useState(['all', 'dresses', 'coats'])
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

    useEffect(() =>
    {
        const data = { category }
        dispatch(getProducts());
        dispatch(getFilterProducts(data));
    }, [dispatch, category]);

    // useEffect(() =>
    // {
    //     setCurrentProducts(productsFilter?.length > 0 ? productsFilter : products)
    // }, [currentProducts, productsFilter, products])



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
                            <Suspense fallback={<div> loading ... </div>}>
                                < SwiperCarousel items={productsFilter} />
                            </Suspense>
                        )}
                    </div>
                </div>
                <Link to="/products" className="btn">shop now</Link>
            </div>
        </div>
    )
}
