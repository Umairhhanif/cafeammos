/**
 * This script downloads the missing images that failed in the previous script.
 * To run this script, execute: node --experimental-modules src/scripts/download-missing-images.js
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

// Define missing images with new URLs
const missingImages = [
  // These failed with 404 errors in the previous script
  { url: 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dish-souffle.jpg' },
  { url: 'https://images.unsplash.com/photo-1676037150844-acc17b4ed2c4?q=80&w=600&h=400&auto=format&fit=crop', filename: 'app-carpaccio.jpg' },
  { url: 'https://images.unsplash.com/photo-1662116765994-1e4200c43589?q=80&w=600&h=400&auto=format&fit=crop', filename: 'main-risotto.jpg' },
  { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&h=400&auto=format&fit=crop', filename: 'dessert-cheesecake.jpg' },
  { url: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600&h=400&auto=format&fit=crop', filename: 'drink-tea.jpg' }
];

// Download all missing images sequentially
async function downloadMissing() {
  for (const image of missingImages) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  console.log('All missing images have been downloaded to public/images/');
}

downloadMissing(); 