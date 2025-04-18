/**
 * This script downloads just the cheesecake image.
 * To run this script, execute: node --experimental-modules src/scripts/download-cheesecake.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image directory
const imagesDir = path.join(__dirname, '../../public/images');

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

// Download the cheesecake image
async function downloadCheesecake() {
  const url = 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800';
  const filename = 'dessert-cheesecake.jpg';
  
  try {
    await downloadImage(url, filename);
    console.log('Cheesecake image has been downloaded successfully.');
  } catch (error) {
    console.error('Error downloading cheesecake image:', error.message);
  }
}

downloadCheesecake(); 