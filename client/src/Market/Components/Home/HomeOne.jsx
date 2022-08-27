import React, { useEffect, lazy, Suspense } from 'react'
import AOS from "aos"
import Spinner from '../Layout/Spinner'

const LandingPage = lazy(() => import('./sections/LandingPage'))
const Features = lazy(() => import('./sections/Features'))

const Categories = lazy(() => import('./sections/Categories'))
const Products = lazy(() => import('./sections/Products'))
const NewArrivals = lazy(() => import('./sections/NewArrivals'))
const Footer = lazy(() => import('./sections/Footer'))
const CustomersSays = lazy(() => import('./sections/CustomersSays'))
const Services = lazy(() => import('./sections/Services'))


export default function HomeOne()
{

  useEffect(() =>
  {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <div className='home_one'>
      <Suspense fallback={<Spinner />} >
        <LandingPage />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <Features />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <Categories />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <Products />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <NewArrivals />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <CustomersSays />
      </Suspense>
      <Suspense fallback={<Spinner />} >
        <Services />
      </Suspense>
    </div>
  )
}
