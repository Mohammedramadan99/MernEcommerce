import React, { useEffect, lazy, Suspense } from 'react'
import AOS from "aos"

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
      <Suspense fallback={<div />} >
        <LandingPage />
      </Suspense>
      <Suspense fallback={<div />} >
        <Features />
      </Suspense>
      <Suspense fallback={<div />} >
        <Categories />
      </Suspense>
      <Suspense fallback={<div />} >
        <Products />
      </Suspense>
      <Suspense fallback={<div />} >
        <NewArrivals />
      </Suspense>
      <Suspense fallback={<div />} >
        <CustomersSays />
      </Suspense>
      <Suspense fallback={<div />} >
        <Services />
      </Suspense>
    </div>
  )
}
