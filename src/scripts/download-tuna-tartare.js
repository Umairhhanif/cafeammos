/**
 * This script downloads a Spicy Tuna Tartare image from Unsplash.
 * To run this script, execute: node --experimental-modules src/scripts/download-tuna-tartare.js
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

// Specific image for Tuna Tartare
const tunaTartareImage = {
  url: 'https://images.pexels.com/photos/5702778/pexels-photo-5702778.jpeg?auto=compress&cs=tinysrgb&w=800',
  filename: 'app-carpaccio.jpg'
};

// Download the image
async function downloadTunaTartare() {
  try {
    await downloadImage(tunaTartareImage.url, tunaTartareImage.filename);
    console.log('Tuna Tartare image has been downloaded to public/images/');
  } catch (error) {
    console.error(`Error downloading image:`, error.message);
  }
}

downloadTunaTartare(); 