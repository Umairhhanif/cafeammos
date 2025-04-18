# Café Ammos - Restaurant Website

Café Ammos is a modern restaurant website built with Next.js, TypeScript, and Tailwind CSS. It features a beautiful green-themed UI and comprehensive functionality for both diners and restaurant management.

## Features

- **Fine Dining Reservations**: Book a table with a simple form
- **Online Food Ordering**: Browse menus, add items to cart, and place orders for delivery or pickup
- **Responsive Design**: Fully responsive across all device sizes
- **Dark Mode Support**: Light and dark themes that respect user preferences
- **Interactive Menu**: Filter by categories, dietary preferences, and spice level
- **Shopping Cart**: Persistent cart with localStorage for a seamless ordering experience

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Custom UI components
- **State Management**: React Context API
- **Fonts**: Playfair Display (headings), Inter (body text)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or newer
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/cafeammos.git
   cd cafeammos
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── public/              # Static assets
│   └── images/          # Website images
├── src/                 # Source code
│   ├── app/             # Next.js app directory
│   │   ├── menu/        # Menu page
│   │   ├── order/       # Food ordering page
│   │   ├── reservation/ # Table reservation page
│   │   └── layout.tsx   # Root layout
│   ├── components/      # React components
│   │   ├── home/        # Homepage components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── menu/        # Menu components
│   │   ├── order/       # Order components
│   │   ├── reservation/ # Reservation components
│   │   └── ui/          # UI components
│   ├── context/         # React Context providers
│   └── data/            # Static data
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Images

For this project, you'll need to add your own images to the `/public/images` directory. Image paths are referenced in the code.

Required images:
- Hero background: `/images/hero-bg.jpg`
- Menu banner: `/images/menu-banner.jpg`
- Featured dishes: `/images/dish-salmon.jpg`, `/images/dish-risotto.jpg`, `/images/dish-filet.jpg`, `/images/dish-souffle.jpg`
- Restaurant interior: `/images/restaurant-interior.jpg`
- Reservation background: `/images/reservation-bg.jpg`
- Menu items: See `src/data/menuData.ts` for the complete list

## Customization

### Colors

Colors can be customized in the `tailwind.config.ts` file. The current theme uses a green palette for the primary colors.

### Restaurant Information

Restaurant information is scattered throughout the components. Key places to update:
- Contact details: `src/components/layout/Footer.tsx`
- Opening hours: Several components (Footer, Reservation page)
- Menu items: `src/data/menuData.ts`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various fine dining establishments
- Icons from Heroicons
- Font combinations from Google Fonts
