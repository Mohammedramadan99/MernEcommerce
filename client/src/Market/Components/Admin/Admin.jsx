import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'

import Dashboard from './Dashboard'
import ProductsList from './ProductsList'
import NewProduct from "./NewProduct";
import OrderList from "./OrderList";
import ProcessOrder from "./ProcessOrder";
import UsersList from "./UsersList";
import UpdateUser from "./UpdateUser";
import ProductReviews from "./ProductReviews";
import UpdateProduct from "./UpdateProduct";
function Admin()
{
    return (
        <div className='admin'>
            <div className="container">
                <div className="admin__sidebar">
                    <Sidebar />
                </div>
                <div className="admin__content">
                    <Routes>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/products" element={<ProductsList />} />
                        <Route path="/admin/product" element={<NewProduct />} />
                        <Route path="/admin/product/:id" element={<UpdateProduct />} />
                        <Route path="/admin/orders" element={<OrderList />} />
                        <Route path="/admin/order/:id" element={<ProcessOrder />} />
                        <Route path="/admin/users" element={<UsersList />} />
                        <Route path="/admin/user/:id" element={<UpdateUser />} />
                        <Route path="/admin/reviews" element={<ProductReviews />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Admin