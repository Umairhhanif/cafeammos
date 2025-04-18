export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    description: 'Begin your culinary journey with our exquisite appetizers.',
    items: [
      {
        id: 'starters-1',
        name: 'Mediterranean Mezze Platter',
        description: 'A selection of hummus, baba ganoush, tzatziki, olives, and warm pita bread.',
        price: 14.99,
        image: '/images/app-bruschetta.jpg',
        category: 'Starters',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      },
      {
        id: 'starters-2',
        name: 'Seared Scallops',
        description: 'Fresh sea scallops seared to perfection, served with mango salsa and micro greens.',
        price: 16.99,
        image: '/images/app-calamari.jpg',
        category: 'Starters',
        isVegetarian: false,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'starters-3',
        name: 'Spicy Tuna Tartare',
        description: 'Fresh tuna mixed with Asian-inspired flavors, served with avocado and wonton crisps.',
        price: 17.99,
        image: '/images/app-carpaccio.jpg',
        category: 'Starters',
        isVegetarian: false,
        isGlutenFree: false,
        spicyLevel: 2
      },
      {
        id: 'starters-4',
        name: 'Truffle Arancini',
        description: 'Crispy risotto balls infused with black truffle and filled with mozzarella, served with truffle aioli.',
        price: 13.99,
        image: '/images/app-salad.jpg',
        category: 'Starters',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      }
    ]
  },
  {
    id: 'salads',
    name: 'Salads',
    description: 'Fresh, vibrant, and packed with flavor - our salads are a meal in themselves.',
    items: [
      {
        id: 'salads-1',
        name: 'Classic Caesar Salad',
        description: 'Crisp romaine lettuce, house-made Caesar dressing, garlic croutons, and shaved parmesan cheese.',
        price: 12.99,
        image: '/images/app-salad.jpg',
        category: 'Salads',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      },
      {
        id: 'salads-2',
        name: 'Mediterranean Quinoa Bowl',
        description: 'Protein-rich quinoa with cherry tomatoes, cucumber, red onion, feta, olives, and lemon-herb vinaigrette.',
        price: 15.99,
        image: '/images/app-salad.jpg',
        category: 'Salads',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'salads-3',
        name: 'Thai Mango Salad',
        description: 'Fresh mango, bell peppers, cucumber, and herbs with a spicy lime dressing and crispy shallots.',
        price: 14.99,
        image: '/images/app-salad.jpg',
        category: 'Salads',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 2
      }
    ]
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    description: 'Indulge in our chef\'s masterfully crafted entrées, featuring the finest ingredients.',
    items: [
      {
        id: 'main-1',
        name: 'Pan-Seared Salmon',
        description: 'Wild-caught salmon with lemon butter sauce, served with seasonal vegetables and herb-infused quinoa.',
        price: 28.99,
        image: '/images/dish-salmon.jpg',
        category: 'Main Course',
        isVegetarian: false,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'main-2',
        name: 'Truffle Risotto',
        description: 'Creamy Arborio rice cooked with white wine, finished with truffle oil and aged Parmesan cheese.',
        price: 24.99,
        image: '/images/dish-risotto.jpg',
        category: 'Main Course',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'main-3',
        name: 'Filet Mignon',
        description: 'Prime beef tenderloin cooked to perfection, accompanied by garlic mashed potatoes and red wine reduction.',
        price: 36.99,
        image: '/images/dish-filet.jpg',
        category: 'Main Course',
        isVegetarian: false,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'main-4',
        name: 'Herb-Roasted Chicken',
        description: 'Organic free-range chicken roasted with herbs, served with root vegetables and natural jus.',
        price: 26.99,
        image: '/images/main-chicken.jpg',
        category: 'Main Course',
        isVegetarian: false,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'main-5',
        name: 'Spicy Seafood Pasta',
        description: 'Fresh linguine tossed with shrimp, scallops, mussels, and calamari in a spicy tomato sauce.',
        price: 29.99,
        image: '/images/main-pasta.jpg',
        category: 'Main Course',
        isVegetarian: false,
        isGlutenFree: false,
        spicyLevel: 2
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Complete your meal with our irresistible desserts, crafted by our pastry chef.',
    items: [
      {
        id: 'dessert-1',
        name: 'Chocolate Soufflé',
        description: 'Warm chocolate soufflé with a molten center, served with vanilla bean ice cream and berry compote.',
        price: 12.99,
        image: '/images/dish-souffle.jpg',
        category: 'Dessert',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      },
      {
        id: 'dessert-2',
        name: 'Lemon Tart',
        description: 'Buttery pastry shell filled with tangy lemon curd, topped with fresh berries and powdered sugar.',
        price: 10.99,
        image: '/images/dessert-cake.jpg',
        category: 'Dessert',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      },
      {
        id: 'dessert-3',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa.',
        price: 11.99,
        image: '/images/dessert-tiramisu.jpg',
        category: 'Dessert',
        isVegetarian: true,
        isGlutenFree: false,
        spicyLevel: 0
      }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refresh and elevate your dining experience with our selection of beverages.',
    items: [
      {
        id: 'beverage-1',
        name: 'Sparkling Elderflower Lemonade',
        description: 'Refreshing house-made lemonade infused with elderflower and topped with sparkling water.',
        price: 6.99,
        image: '/images/drink-cocktail.jpg',
        category: 'Beverage',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'beverage-2',
        name: 'Artisanal Cold Brew Coffee',
        description: 'Smooth, slow-steeped cold brew coffee served over ice with your choice of flavoring.',
        price: 5.99,
        image: '/images/drink-coffee.jpg',
        category: 'Beverage',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 0
      },
      {
        id: 'beverage-3',
        name: 'Berry Kombucha Fizz',
        description: 'Probiotic-rich kombucha blended with mixed berries and a splash of lime.',
        price: 7.99,
        image: '/images/drink-tea.jpg',
        category: 'Beverage',
        isVegetarian: true,
        isGlutenFree: true,
        spicyLevel: 0
      }
    ]
  }
]; 