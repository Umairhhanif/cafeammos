/**
 * This is a Node.js script to generate placeholder images for the restaurant website.
 * To run this script, execute: node --experimental-modules src/scripts/generate-placeholder-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create an SVG placeholder image
function createSvgPlaceholder(filename, width, height, text, bgColor, textColor) {
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text 
    x="50%" 
    y="50%" 
    font-family="Arial, sans-serif" 
    font-size="${Math.min(width, height) / 12}px" 
    font-weight="bold" 
    fill="${textColor}" 
    text-anchor="middle" 
    dominant-baseline="middle"
  >${text}</text>
</svg>
  `.trim();

  fs.writeFileSync(path.join(imagesDir, filename), svg);
  console.log(`Created ${filename}`);
}

// Create hero background
createSvgPlaceholder('hero-bg.svg', 1920, 1080, 'Restaurant Interior Hero Image', '#16a34a', '#ffffff');

// Create menu banner
createSvgPlaceholder('menu-banner.svg', 1920, 600, 'Menu Banner Image', '#15803d', '#ffffff');

// Create reservation background
createSvgPlaceholder('reservation-bg.svg', 1920, 1080, 'Reservation Background', '#052e16', '#ffffff');

// Create restaurant interior
createSvgPlaceholder('restaurant-interior.svg', 800, 600, 'Restaurant Interior', '#22c55e', '#ffffff');

// Create featured dishes
createSvgPlaceholder('dish-salmon.svg', 600, 400, 'Pan-Seared Salmon', '#4ade80', '#052e16');
createSvgPlaceholder('dish-risotto.svg', 600, 400, 'Truffle Risotto', '#bbf7d0', '#052e16');
createSvgPlaceholder('dish-filet.svg', 600, 400, 'Filet Mignon', '#86efac', '#052e16');
createSvgPlaceholder('dish-souffle.svg', 600, 400, 'Chocolate Soufflé', '#dcfce7', '#052e16');

// Create avatars for testimonials
createSvgPlaceholder('avatar-1.svg', 200, 200, 'SC', '#f59e0b', '#ffffff');
createSvgPlaceholder('avatar-2.svg', 200, 200, 'MC', '#d97706', '#ffffff');
createSvgPlaceholder('avatar-3.svg', 200, 200, 'ER', '#b45309', '#ffffff');
createSvgPlaceholder('avatar-4.svg', 200, 200, 'JW', '#92400e', '#ffffff');

// Create additional menu item images
// Appetizers
createSvgPlaceholder('app-bruschetta.svg', 600, 400, 'Bruschetta', '#bbf7d0', '#052e16');
createSvgPlaceholder('app-calamari.svg', 600, 400, 'Calamari', '#4ade80', '#052e16');
createSvgPlaceholder('app-carpaccio.svg', 600, 400, 'Beef Carpaccio', '#86efac', '#052e16');
createSvgPlaceholder('app-salad.svg', 600, 400, 'Salad', '#dcfce7', '#052e16');

// Main Courses
createSvgPlaceholder('main-steak.svg', 600, 400, 'Ribeye Steak', '#4ade80', '#052e16');
createSvgPlaceholder('main-chicken.svg', 600, 400, 'Roasted Chicken', '#bbf7d0', '#052e16');
createSvgPlaceholder('main-pasta.svg', 600, 400, 'Seafood Pasta', '#86efac', '#052e16');
createSvgPlaceholder('main-risotto.svg', 600, 400, 'Mushroom Risotto', '#dcfce7', '#052e16');

// Desserts
createSvgPlaceholder('dessert-tiramisu.svg', 600, 400, 'Tiramisu', '#4ade80', '#052e16');
createSvgPlaceholder('dessert-cheesecake.svg', 600, 400, 'Cheesecake', '#bbf7d0', '#052e16');
createSvgPlaceholder('dessert-icecream.svg', 600, 400, 'Gelato', '#86efac', '#052e16');
createSvgPlaceholder('dessert-cake.svg', 600, 400, 'Chocolate Cake', '#dcfce7', '#052e16');

// Drinks
createSvgPlaceholder('drink-wine.svg', 600, 400, 'Wine', '#4ade80', '#052e16');
createSvgPlaceholder('drink-cocktail.svg', 600, 400, 'Cocktail', '#bbf7d0', '#052e16');
createSvgPlaceholder('drink-coffee.svg', 600, 400, 'Coffee', '#86efac', '#052e16');
createSvgPlaceholder('drink-tea.svg', 600, 400, 'Tea', '#dcfce7', '#052e16');

console.log('All placeholder images have been created in public/images/'); 