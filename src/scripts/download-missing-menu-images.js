/**
 * This script downloads images for menu items with empty JPG files.
 * To run this script, execute: node --experimental-modules src/scripts/download-missing-menu-images.js
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

// Define missing images with reliable URLs
const missingImages = [
  {
    url: 'https://images.pexels.com/photos/5702778/pexels-photo-5702778.jpeg?auto=compress&cs=tinysrgb&w=800',
    filename: 'app-carpaccio.jpg',
    description: 'Spicy Tuna Tartare'
  },
  {
    url: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    filename: 'dessert-cheesecake.jpg',
    description: 'Cheesecake'
  },
  {
    url: 'https://images.pexels.com/photos/4969896/pexels-photo-4969896.jpeg?auto=compress&cs=tinysrgb&w=800',
    filename: 'dish-souffle.jpg',
    description: 'Chocolate Soufflé'
  },
  {
    url: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=800',
    filename: 'drink-tea.jpg',
    description: 'Tea'
  },
  {
    url: 'https://images.pexels.com/photos/4553031/pexels-photo-4553031.jpeg?auto=compress&cs=tinysrgb&w=800',
    filename: 'main-risotto.jpg',
    description: 'Mushroom Risotto'
  }
];

// Download all missing images
async function downloadAllMissingImages() {
  console.log('Downloading missing menu images...');
  
  for (const image of missingImages) {
    try {
      await downloadImage(image.url, image.filename);
      console.log(`Finished downloading ${image.description} image.`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }
  
  console.log('All missing menu images have been downloaded to public/images/');
}

downloadAllMissingImages(); 