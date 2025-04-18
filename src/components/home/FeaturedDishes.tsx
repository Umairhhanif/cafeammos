import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
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

const featuredDishes: Dish[] = [
  {
    id: 1,
    name: 'Pan-Seared Salmon',
    description: 'Wild-caught salmon with lemon butter sauce, served with seasonal vegetables and herb-infused quinoa.',
    price: 28.99,
    image: '/images/dish-salmon.jpg',
    category: 'Main Course'
  },
  {
    id: 2,
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice cooked with white wine, finished with truffle oil and aged Parmesan cheese.',
    price: 24.99,
    image: '/images/dish-risotto.jpg',
    category: 'Vegetarian'
  },
  {
    id: 3,
    name: 'Filet Mignon',
    description: 'Prime beef tenderloin cooked to perfection, accompanied by garlic mashed potatoes and red wine reduction.',
    price: 36.99,
    image: '/images/dish-filet.jpg',
    category: 'Signature'
  },
  {
    id: 4,
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with a molten center, served with vanilla bean ice cream and berry compote.',
    price: 12.99,
    image: '/images/dish-souffle.jpg',
    category: 'Dessert'
  }
];

const FeaturedDishes = () => {
  return (
    <section className="section-padding bg-primary-50/70 dark:bg-primary-950 relative">
      <div className="absolute top-0 right-0 w-1/2 h-64 bg-primary-100/80 dark:bg-primary-900/30 -z-10 rounded-bl-3xl"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-medium mb-2 block">Our Specialties</span>
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-primary-800 dark:text-primary-400">Featured Dishes</h2>
          <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our chef&rsquo;s signature creations, prepared with seasonal ingredients and culinary expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="bg-primary-100/60 dark:bg-primary-900/40 rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-2 right-2 z-10 bg-primary-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {dish.category}
                </div>
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl mb-2 text-primary-800 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-300">{dish.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300">{formatPriceInPKR(dish.price)}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:scale-105 transition-transform duration-300" 
                    animation="ripple"
                  >
                    Add to Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            href="/menu" 
            size="lg" 
            animation="lift"
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes; 