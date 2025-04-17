// Script to create placeholder images
const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const dirs = [
  'public/images/logos',
  'public/images/banners',
  'public/images/categories'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Function to download a placeholder image
function downloadPlaceholder(text, color, bgColor, width, height, filepath) {
  return new Promise((resolve, reject) => {
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      resolve();
      return;
    }
    
    // Use dummyimage.com to generate placeholder images
    const url = `https://dummyimage.com/${width}x${height}/${bgColor.replace('#', '')}/${color.replace('#', '')}&text=${encodeURIComponent(text)}`;
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Created: ${filepath}`);
        resolve();
      });

      fileStream.on('error', err => {
        fs.unlink(filepath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Logo images
const logos = [
  // Cloud Storage
  { name: 'google-one.png', text: 'Google One', color: 'fff', bgColor: '4285f4' },
  { name: 'google-drive.png', text: 'Drive', color: 'fff', bgColor: '0f9d58' },
  { name: 'onedrive.png', text: 'OneDrive', color: 'fff', bgColor: '0078d4' },
  { name: 'dropbox.png', text: 'Dropbox', color: 'fff', bgColor: '0061ff' },
  
  // AI Tools
  { name: 'chatgpt.png', text: 'ChatGPT', color: 'fff', bgColor: '10a37f' },
  { name: 'gemini.png', text: 'Gemini', color: 'fff', bgColor: '8e44ad' },
  { name: 'claude.png', text: 'Claude', color: 'fff', bgColor: '5436da' },
  { name: 'midjourney.png', text: 'Midjourney', color: 'fff', bgColor: '0b0f15' },
  { name: 'dall-e.png', text: 'DALL-E', color: 'fff', bgColor: 'ff9d00' },
  
  // Creative
  { name: 'canva.png', text: 'Canva', color: 'fff', bgColor: '00c4cc' },
  { name: 'adobe.png', text: 'Adobe', color: 'fff', bgColor: 'fa0f00' },
  { name: 'figma.png', text: 'Figma', color: 'fff', bgColor: 'f24e1e' },
  
  // Entertainment
  { name: 'netflix.png', text: 'Netflix', color: 'fff', bgColor: 'e50914' },
  { name: 'spotify.png', text: 'Spotify', color: 'fff', bgColor: '1db954' },
  { name: 'youtube.png', text: 'YouTube', color: 'fff', bgColor: 'ff0000' },
  
  // Office
  { name: 'microsoft-365.png', text: 'M365', color: 'fff', bgColor: '0078d4' },
  { name: 'notion.png', text: 'Notion', color: 'fff', bgColor: '000000' },
  { name: 'trello.png', text: 'Trello', color: 'fff', bgColor: '0079bf' },
  
  // Security
  { name: 'nordvpn.png', text: 'NordVPN', color: 'fff', bgColor: '4687ff' },
  { name: 'expressvpn.png', text: 'ExpressVPN', color: 'fff', bgColor: 'd13639' },
  { name: 'norton.png', text: 'Norton', color: 'fff', bgColor: 'ffcc00' }
];

// Banner images - make these larger
const banners = [
  { name: 'google-one-banner.png', text: 'Google One', color: 'fff', bgColor: '4285f4' },
  { name: 'canva-banner.png', text: 'Canva Banner', color: 'fff', bgColor: '00c4cc' },
  { name: 'ai-tools-banner.png', text: 'AI Tools', color: 'fff', bgColor: 'ea4335' },
  { name: 'office-banner.png', text: 'Office Tools', color: 'fff', bgColor: '0078d4' },
  { name: 'entertainment-banner.png', text: 'Entertainment', color: 'fff', bgColor: 'e50914' }
];

// Category images
const categories = [
  { name: 'cloud-storage.png', text: 'Cloud Storage', color: 'fff', bgColor: '4285f4' },
  { name: 'ai-tools.png', text: 'AI Tools', color: 'fff', bgColor: 'ea4335' },
  { name: 'learning.png', text: 'Learning', color: 'fff', bgColor: '34a853' },
  { name: 'entertainment.png', text: 'Entertainment', color: 'fff', bgColor: 'fbbc05' },
  { name: 'graphics.png', text: 'Graphics', color: 'fff', bgColor: 'ff6b6b' },
  { name: 'security.png', text: 'Security', color: 'fff', bgColor: '4c6ef5' },
  { name: 'office.png', text: 'Office', color: 'fff', bgColor: 'be4bdb' }
];

// Create all placeholder images
async function createAllPlaceholders() {
  try {
    const promises = [];

    // Create logos (small)
    for (const logo of logos) {
      const filepath = path.join('public/images/logos', logo.name);
      promises.push(downloadPlaceholder(logo.text, logo.color, logo.bgColor, 150, 150, filepath));
    }

    // Create banners (large)
    for (const banner of banners) {
      const filepath = path.join('public/images/banners', banner.name);
      promises.push(downloadPlaceholder(banner.text, banner.color, banner.bgColor, 900, 400, filepath));
    }

    // Create category images (medium)
    for (const category of categories) {
      const filepath = path.join('public/images/categories', category.name);
      promises.push(downloadPlaceholder(category.text, category.color, category.bgColor, 300, 300, filepath));
    }

    await Promise.all(promises);
    console.log('All placeholder images created successfully!');
  } catch (error) {
    console.error('Error creating placeholder images:', error);
  }
}

// Start creating images
createAllPlaceholders(); 