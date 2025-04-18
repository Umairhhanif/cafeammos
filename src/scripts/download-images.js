/**
 * This is a Node.js script to download real restaurant and food images for the website.
 * To run this script, execute: node --experimental-modules src/scripts/download-images.js
 */

import https from 'https';
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

// Function to download an image from a URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Define image URLs and their corresponding filenames
const images = [
  // Hero and background images
  { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&h=1080&auto=format&fit=crop', filename: 'hero-bg.jpg' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&h=600&auto=format&fit=crop', filename: 'menu-banner.jpg' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&h=1080&auto=format&fit=crop', filename: 'reservation-bg.jpg' },
  { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&h=600&auto=format&fit=crop', filename: 'restaurant-interior.jpg' },
  
  // Featured dishes
  { url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dish-salmon.jpg' },
  { url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dish-risotto.jpg' },
  { url: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dish-filet.jpg' },
  { url: 'https://images.unsplash.com/photo-1623246123320-0d6636755345?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dish-souffle.jpg' },
  
  // Avatars for testimonials
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop', filename: 'avatar-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop', filename: 'avatar-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop', filename: 'avatar-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop', filename: 'avatar-4.jpg' },
  
  // Appetizers
  { url: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?q=80&w=600&h=400&auto=format&fit=crop', filename: 'app-bruschetta.jpg' },
  { url: 'https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?q=80&w=600&h=400&auto=format&fit=crop', filename: 'app-calamari.jpg' },
  { url: 'https://images.unsplash.com/photo-1626082626876-98331469c4c5?q=80&w=600&h=400&auto=format&fit=crop', filename: 'app-carpaccio.jpg' },
  { url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&h=400&auto=format&fit=crop', filename: 'app-salad.jpg' },
  
  // Main Courses
  { url: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&h=400&auto=format&fit=crop', filename: 'main-steak.jpg' },
  { url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&h=400&auto=format&fit=crop', filename: 'main-chicken.jpg' },
  { url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&h=400&auto=format&fit=crop', filename: 'main-pasta.jpg' },
  { url: 'https://images.unsplash.com/photo-1648589059582-877356352b35?q=80&w=600&h=400&auto=format&fit=crop', filename: 'main-risotto.jpg' },
  
  // Desserts
  { url: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dessert-tiramisu.jpg' },
  { url: 'https://images.unsplash.com/photo-1568571780765-9276107cecfc?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dessert-cheesecake.jpg' },
  { url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dessert-icecream.jpg' },
  { url: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dessert-cake.jpg' },
  
  // Drinks
  { url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=600&h=400&auto=format&fit=crop', filename: 'drink-wine.jpg' },
  { url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&h=400&auto=format&fit=crop', filename: 'drink-cocktail.jpg' },
  { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&h=400&auto=format&fit=crop', filename: 'drink-coffee.jpg' },
  { url: 'https://images.unsplash.com/photo-1556679343-c5306bfb8a39?q=80&w=600&h=400&auto=format&fit=crop', filename: 'drink-tea.jpg' }
];

// Download all images sequentially to avoid overwhelming the network
async function downloadAll() {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  console.log('All images have been downloaded to public/images/');
}

downloadAll(); 