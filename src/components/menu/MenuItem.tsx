'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: number;
  onAddToCart: (id: string, quantity: number) => void;
  index?: number;
}

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

const MenuItem = ({
  id,
  name,
  description,
  price,
  image,
  category,
  isVegetarian = false,
  isGlutenFree = false,
  spicyLevel = 0,
  onAddToCart,
  index = 0,
}: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  // Function to render spicy indicator dots
  const renderSpicyDots = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i < spicyLevel 
                ? 'bg-red-500' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-primary-50/50 dark:bg-primary-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group animate-fadeIn flex flex-col h-full" 
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationDuration: '0.8s',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s ease-in-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Fixed height */}
      <div className="relative w-full h-[200px] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Tag */}
        <div className="absolute top-2 right-2 z-10 bg-primary-600 text-white text-xs font-bold py-1 px-2 rounded-full transform group-hover:scale-105 transition-transform duration-300">
          {category}
        </div>
        
        {/* Dietary Tags */}
        <div className="absolute bottom-2 left-2 z-10 flex gap-2">
          {isVegetarian && (
            <div className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <span className="mr-1">V</span>
              <span className="hidden sm:inline">Vegetarian</span>
            </div>
          )}
          {isGlutenFree && (
            <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">
              <span className="mr-1">GF</span>
              <span className="hidden sm:inline">Gluten-Free</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Section - Flex column with minimum height */}
      <div className="p-5 flex flex-col flex-grow min-h-[180px]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl text-primary-800 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300 truncate pr-2">{name}</h3>
          {spicyLevel > 0 && <div className="flex-shrink-0">{renderSpicyDots()}</div>}
        </div>
        
        <div className="min-h-[60px] mb-4 flex-grow">
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
        </div>
        
        {/* Controls Section - Fixed at bottom */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="w-[100px]">
            <span className="font-semibold text-primary-600 dark:text-primary-400 text-lg group-hover:scale-110 transition-transform duration-300 block">
              {quantity > 1 ? (
                <div className="flex flex-col">
                  <span>{formatPriceInPKR(price * quantity)}</span>
                  <span className="text-xs text-primary-500 dark:text-primary-500">{quantity} × {formatPriceInPKR(price)}</span>
                </div>
              ) : (
                formatPriceInPKR(price)
              )}
            </span>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="flex border border-primary-300 dark:border-primary-700 rounded-md overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-2 py-1 flex items-center justify-center min-w-[1.5rem] bg-primary-50 dark:bg-primary-900">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="whitespace-nowrap transform group-hover:scale-105 transition-transform duration-300"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem; 