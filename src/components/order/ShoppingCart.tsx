'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Button from '../ui/Button';

// Function to format price in PKR
const formatPriceInPKR = (price: number): string => {
  // Convert USD to PKR (approximate conversion rate)
  const priceInPKR = Math.round(price * 280);
  
  // Format with thousands separators
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(priceInPKR);
};

const ShoppingCart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'card',
    specialInstructions: '',
  });

  // Calculate total with tax only
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the order to the backend
    console.log('Order submitted:', { items, ...checkoutForm, total });
    alert('Your order has been placed successfully! You will receive a confirmation shortly.');
    clearCart();
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6 md:p-8 w-full text-center">
        <div className="flex flex-col items-center justify-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-primary-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-xl font-display mb-2">Your cart is empty</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add some delicious items from our menu to get started.
          </p>
          <Button href="/menu" variant="primary">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  if (isCheckingOut) {
    return (
      <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6 md:p-8 w-full">
        <h2 className="font-display text-2xl mb-6 pb-4 border-b border-primary-300/50 dark:border-primary-700/50">
          Checkout
        </h2>

        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={checkoutForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/30 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/30 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={checkoutForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/30 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Delivery Method</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={checkoutForm.deliveryMethod === 'delivery'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <div>
                    <span className="font-medium">Delivery</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estimated delivery time: 30-45 minutes (Free delivery)
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={checkoutForm.deliveryMethod === 'pickup'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <div>
                    <span className="font-medium">Pickup</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ready for pickup in 15-20 minutes
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Delivery Address - only shown if delivery is selected */}
            {checkoutForm.deliveryMethod === 'delivery' && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={checkoutForm.address || "AC-10, Block-4, Clifton, Karachi"}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-primary-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/30 dark:text-white"
                    placeholder="Street address, apartment, city, state, zip code"
                  ></textarea>
                </div>
                
                {/* Google Maps Embed */}
                <div className="rounded-lg overflow-hidden shadow-md border border-primary-300/50 dark:border-primary-700/50 h-[200px] w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.247077892832!2d67.02871481498853!3d24.82618558407247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33d9a2e346f71%3A0x3f129a47e5a47e64!2sBlock%204%20Clifton%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1624456789012!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Restaurant Location"
                    className="filter brightness-90 dark:brightness-75"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={checkoutForm.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={checkoutForm.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="font-medium">Cash on Delivery/Pickup</span>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="md:col-span-2">
              <label 
                htmlFor="specialInstructions" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Special Instructions (Optional)
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={checkoutForm.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-primary-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary-500 bg-primary-50/50 dark:bg-primary-900/30 dark:text-white"
                placeholder="Any special requests, allergies, or delivery instructions"
              ></textarea>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-primary-200/30 dark:bg-primary-900/40 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {/* Show individual items */}
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPriceInPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-primary-300/50 dark:border-primary-700/50"></div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPriceInPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>{formatPriceInPKR(tax)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-primary-300/50 dark:border-primary-700/50">
                <span>Total:</span>
                <span>{formatPriceInPKR(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" fullWidth>
              Place Order
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              fullWidth
              onClick={() => setIsCheckingOut(false)}
            >
              Back to Cart
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-primary-100/60 dark:bg-primary-950/30 rounded-xl shadow-lg p-6 md:p-8 w-full">
      <h2 className="font-display text-2xl mb-6 pb-4 border-b border-primary-300/50 dark:border-primary-700/50">
        Your Order
      </h2>

      <div className="divide-y divide-primary-300/50 dark:divide-primary-700/50">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-center">
            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              <div className="flex justify-between mt-1">
                <div className="flex flex-col">
                  <span className="text-primary-600">{formatPriceInPKR(item.price)} each</span>
                  {item.quantity > 1 && (
                    <span className="text-primary-800 dark:text-primary-400 font-medium">
                      {formatPriceInPKR(item.price * item.quantity)} total
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-l hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-primary-200/30 dark:bg-primary-900/40 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          {/* Show individual items */}
          <div className="space-y-2 mb-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPriceInPKR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-2 border-t border-primary-300/50 dark:border-primary-700/50"></div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatPriceInPKR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%):</span>
            <span>{formatPriceInPKR(tax)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-primary-300/50 dark:border-primary-700/50">
            <span>Total:</span>
            <span>{formatPriceInPKR(total)}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Includes 8% tax. Free delivery on all orders.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button onClick={() => setIsCheckingOut(true)} fullWidth>
          Proceed to Checkout
        </Button>
        <Button href="/menu" variant="outline" fullWidth>
          Continue Shopping
        </Button>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 transition-colors mt-2 text-center"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart; 