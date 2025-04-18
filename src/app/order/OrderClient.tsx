'use client';

import React, { useState } from 'react';
import MenuList from '@/components/menu/MenuList';
import ShoppingCart from '@/components/order/ShoppingCart';
import { useCart } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';

const OrderClient = () => {
  const { itemCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <Layout>
      <div className="pt-20 bg-primary-100/50 dark:bg-primary-950/50 min-h-screen">
        <div className="container-custom py-16">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Online Ordering</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Enjoy our delicious cuisine in the comfort of your home. Browse our menu and place your order with just a few clicks.
            </p>
          </div>
          
          {/* Mobile Cart Toggle Button */}
          <div className="lg:hidden mb-8 sticky top-20 z-40 w-full">
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md shadow-md w-full flex items-center justify-center btn-ripple"
            >
              {showCart ? (
                <>
                  <span>Back to Menu</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span>View Cart ({itemCount})</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Menu Section */}
            <div className={`lg:col-span-8 ${showCart ? 'hidden lg:block' : 'block'}`}>
              <MenuList showFilters={true} />
            </div>
            
            {/* Cart Section */}
            <div className={`lg:col-span-4 ${showCart ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 lg:pl-2">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderClient; 