import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import ProtectedRoute from './ProtectedRoute'; // Import the simplified ProtectedRoute

const RouterRoutes = () => {
    const isAuthenticated = false; // You can replace this with real logic later

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />

                {/* Protect the Product Details page */}
                <Route
                    path="/product-details/:productId"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ProductDetails />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;
