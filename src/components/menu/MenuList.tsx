'use client';

import React, { useState, useEffect } from 'react';
import { menuCategories } from '@/data/menuData';
import MenuItem from './MenuItem';
import { useCart } from '@/context/CartContext';

interface MenuListProps {
  showFilters?: boolean;
}

const MenuList = ({ showFilters = true }: MenuListProps) => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    glutenFree: false,
  });
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);
  const [animateItems, setAnimateItems] = useState(true);

  // Reset animation state when filters change
  useEffect(() => {
    setAnimateItems(false);
    const timer = setTimeout(() => setAnimateItems(true), 100);
    return () => clearTimeout(timer);
  }, [activeCategory, dietaryFilters.vegetarian, dietaryFilters.glutenFree, spicyLevel]);

  const handleAddToCart = (id: string, quantity: number) => {
    const allItems = menuCategories.flatMap(category => category.items);
    const item = allItems.find(item => item.id === id);
    
    if (item) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      }, quantity);
    }
  };

  const filteredCategories = menuCategories.map(category => {
    const filteredItems = category.items.filter(item => {
      // Filter by category
      if (activeCategory !== 'all' && category.id !== activeCategory) {
        return false;
      }
      
      // Filter by dietary preferences
      if (dietaryFilters.vegetarian && !item.isVegetarian) {
        return false;
      }
      if (dietaryFilters.glutenFree && !item.isGlutenFree) {
        return false;
      }
      
      // Filter by spicy level
      if (spicyLevel !== null && item.spicyLevel !== spicyLevel) {
        return false;
      }
      
      return true;
    });
    
    return {
      ...category,
      items: filteredItems,
    };
  }).filter(category => category.items.length > 0);

  const handleDietaryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDietaryFilters(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSpicyLevelChange = (level: number | null) => {
    setSpicyLevel(level === spicyLevel ? null : level);
  };

  return (
    <div>
      {showFilters && (
        <div className="bg-primary-50/70 dark:bg-primary-900/30 backdrop-blur-sm rounded-xl shadow-md mb-8 p-6 animate-fadeIn" style={{ animationDuration: '0.8s' }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-primary-800 dark:text-primary-400">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-primary-600 text-white shadow-md transform scale-105'
                    : 'bg-primary-100/70 dark:bg-primary-800/40 hover:bg-primary-200/80 dark:hover:bg-primary-800/60 text-primary-800 dark:text-primary-300 hover:scale-105'
                }`}
              >
                All
              </button>
              {menuCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md transform scale-105'
                      : 'bg-primary-100/70 dark:bg-primary-800/40 hover:bg-primary-200/80 dark:hover:bg-primary-800/60 text-primary-800 dark:text-primary-300 hover:scale-105'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary-800 dark:text-primary-400">Dietary Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-800/30 transition-colors">
                  <input
                    type="checkbox"
                    name="vegetarian"
                    checked={dietaryFilters.vegetarian}
                    onChange={handleDietaryFilterChange}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-primary-700 dark:text-primary-300">Vegetarian</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-primary-100/50 dark:hover:bg-primary-800/30 transition-colors">
                  <input
                    type="checkbox"
                    name="glutenFree"
                    checked={dietaryFilters.glutenFree}
                    onChange={handleDietaryFilterChange}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-primary-700 dark:text-primary-300">Gluten-Free</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary-800 dark:text-primary-400">Spicy Level</h3>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map(level => (
                  <button
                    key={level}
                    onClick={() => handleSpicyLevelChange(level)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                      spicyLevel === level
                        ? 'bg-red-500 text-white shadow-md scale-110'
                        : 'bg-primary-100/70 dark:bg-primary-800/40 hover:bg-primary-200/80 dark:hover:bg-primary-800/60 text-primary-800 dark:text-primary-300 hover:scale-110'
                    }`}
                    aria-label={`Spicy level ${level}`}
                  >
                    {level === 0 ? '0' : '🌶️'.repeat(level)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredCategories.length === 0 ? (
        <div className="bg-primary-50/70 dark:bg-primary-900/30 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center animate-fadeIn" style={{ animationDuration: '0.8s' }}>
          <p className="text-primary-700 dark:text-primary-300">
            No menu items match your filters. Please try different filters.
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {filteredCategories.map(category => (
            <div key={category.id} id={category.id} className="scroll-mt-24 animate-fadeIn" style={{ animationDuration: '1s' }}>
              <div className="mb-8 relative">
                <div className="absolute -left-4 w-1 h-12 bg-primary-500 rounded-full transform -translate-y-1/2 top-1/2"></div>
                <h2 className="font-display text-2xl md:text-3xl mb-2 text-primary-800 dark:text-primary-400 pl-2">{category.name}</h2>
                <p className="text-primary-700 dark:text-primary-300 pl-2">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
                {animateItems && category.items.map((item, index) => (
                  <div key={item.id} className="h-full" style={{ minHeight: '430px' }}>
                    <MenuItem
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      category={item.category}
                      isVegetarian={item.isVegetarian}
                      isGlutenFree={item.isGlutenFree}
                      spicyLevel={item.spicyLevel}
                      onAddToCart={handleAddToCart}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList; 