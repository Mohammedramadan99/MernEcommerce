import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";

// styles lib
import "./Sass/Style.css";
// import "./Bootstrap/BootStrap/bootstrap.min.css";
import 'aos/dist/aos.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux'
import HomeOne from "./Components/Home/HomeOne";
import HomeTwo from "./Components/Home/HomeTwo";
import HomeVersions from "./Pages/HomeVersions";
import CustomerRevForm from "./Pages/CustomerRevForm";
import Footer from './Components/Home/sections/Footer'
import { lazy } from "react";
import AOS from "aos"

const SingleProduct = lazy(() => import("./Pages/SingleProduct"))
const Cart = lazy(() => import("./Pages/Cart"))
const ProductsList = lazy(() => import('./Components/Admin/ProductsList'))
const Products = lazy(() => import("./Pages/Products"))
const Blog = lazy(() => import("./Pages/Blog"))
const PostDetails = lazy(() => import("./Components/Blog/PostDetails"))
const EditPost = lazy(() => import("./Components/Blog/EditPost"))
const UpdateProduct = lazy(() => import("./Components/Admin/UpdateProduct"))
const NewPost = lazy(() => import("./Components/Blog/NewPost"))
const Payment = lazy(() => import('./Components/Order/payment'))
const ShippingAddress = lazy(() => import("./Components/Cart/ShippingAddress"))
const Success = lazy(() => import("./Components/Order/Success"))
const UsersList = lazy(() => import("./Components/Admin/UsersList"))
const OrderList = lazy(() => import("./Components/Admin/OrderList"))
const Orders = lazy(() => import("./Pages/Orders"))
const OrderDetails = lazy(() => import("./Components/Order/OrderDetails"))
const ProductReviews = lazy(() => import("./Components/Admin/ProductReviews"))
const Profile = lazy(() => import("./Components/User/Profile"))


const AuthScreen = lazy(() => import("./Pages/AuthScreen"))
const NotFound = lazy(() => import('./Components/Layout/Notfound'))
const Dashboard = lazy(() => import('./Components/Admin/Dashboard'))
const NewProduct = lazy(() => import("./Components/Admin/NewProduct"))
const ProductedUserRoute = lazy(() => import("./Components/ProductedRoutes/ProductedUserRoute"))
const ProductedAdminRoute = lazy(() => import("./Components/ProductedRoutes/ProductedAdminRoute"))
const ProcessOrder = lazy(() => import("./Components/Admin/ProcessOrder"))
const UpdateUser = lazy(() => import("./Components/Admin/UpdateUser"))
const UpdateProfile = lazy(() => import("./Components/User/UpdateProfile"))
const ForgotPassword = lazy(() => import("./Components/User/ForgotPassword"))
const ResetPassword = lazy(() => import("./Components/User/ResetPassword"))

export const App = () =>
{

  useEffect(() =>
  {
    AOS.init({
      duration: 2000
    });
  }, []);

  // const [showSignup, setShowSignup] = useState(false);
  const { LogInShow } = useSelector(state => state.auth)
  const [stripeApiKey, setStripeApiKey] = useState("")


  // async function getStripeApiKey() {
  //   const {data} = await axios.get("/api/v1/stripeapikey")
  //   setStripeApiKey(data.stripeApiKey&&data.stripeApiKey)
  // }
  // console.log(stripeApiKey)
  // useEffect(() => {
  //   getStripeApiKey()
  // }, [])

  // !to make user cann't do right click on the website
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Navbar />
      <ToastContainer />
      {/* <Elements stripe={loadStripe('pk_test_51KU7PlKTQl5sdnSan4XZdyG8ROCvMps693X5fs4PDrQSR8UahyknWe9GPkuem5zqhyoLGE8GKmFa3fPRmq23joWV00XB7Rlte3')}> */}
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<HomeVersions />} /> */}
          <Route path='/' element={<HomeOne />} />
          {/* <Route path='/home-v2' element={<HomeTwo />} /> */}
          <Route path="/product/:productID" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:cat" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/new" element={<NewPost />} />
          <Route path="/blog/:id" element={<PostDetails />} />
          <Route path="/blog/edit/:id" element={<EditPost />} />
          {/* <Route path="/blog/new" element={<EditPost/>} /> */}

          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sed cupiditate non autem doloribus id maxime, ratione voluptatibus quibusdam! Distinctio blanditiis facilis dolorum non, culpa impedit! Tenetur quae voluptate dolore. */}

          {/* only for users */}
          <Route element={<ProductedUserRoute />}>
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/customer/FAQ" element={<CustomerRevForm />} />

            {/* only for admin */}
            <Route element={<ProductedAdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductsList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      {/* </Elements> */}
      <Footer />

      {LogInShow && <AuthScreen />}
    </>
  );
};

export default App;

// this Project needs to develop some things in its:
// 1. review way : is so bad because of :
// a. when click on product to show the detailes, the alert of 'review submitted' display .. without make review
// b. after i click add review, the review will add in dbs but does not display on the moment in the reviews of products, it needs to make refresh