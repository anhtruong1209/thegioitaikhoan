// Script to download images for the cloud storage account shop
const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

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

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      resolve();
      return;
    }

    // For placeholder URLs, we'll create placeholder images
    if (url.startsWith('placeholder')) {
      const [width, height, text] = url.replace('placeholder:', '').split('x');
      const placeholderUrl = `https://via.placeholder.com/${width}x${height}?text=${text || 'Image'}`;
      
      https.get(placeholderUrl, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${placeholderUrl}: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });

        fileStream.on('error', err => {
          fs.unlink(filepath, () => {}); // Delete the file if there's an error
          reject(err);
        });
      }).on('error', reject);
      
      return;
    }

    // Download from the provided URL
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });

      fileStream.on('error', err => {
        fs.unlink(filepath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Image definitions
const images = {
  logos: {
    // Cloud Storage
    'google-one.png': 'https://lh3.googleusercontent.com/pw/AP1GczP_GkJLqRnNdC-3HAA3hiH3yJRWTgCDZ05x6IqwkSgVc9JHv_MBp2ECGw1w3UKqPrPlh9orXF3tJMNJw8sUwUlKo_9dXAP8m0CxFewG9sGzrYaWTqU=w2400',
    'google-drive.png': 'https://lh3.googleusercontent.com/pw/AP1GczMfsOBpeTWqr_VeWU_yx9YqbDklzXKJGtUOaeQUOeK1vgn_cMCsBA1-pA9bCIQThnXvHGS5shinlnUh2u_bW7yrX2ihH7j_ZeB9yz87nbfBGEOL11U=w2400',
    'onedrive.png': 'https://lh3.googleusercontent.com/pw/AP1GczNGGwp5ixXCKBjc-BYkEFcYVEC-g6QAcmSxpIytDaE_w4Rp_6-EkK-bCsYQQaXrSjgCyJVdmbXQ8TTu2i2S5LHjg3eJFigTcKe8zpqdm3rOEu4gIPk=w2400',
    'dropbox.png': 'https://lh3.googleusercontent.com/pw/AP1GczP24rHEJxjS0OgaG6D2Fu8YWfVxpQNQDKpJMjRXMJM95aX4E9JP7S7bGV6tGC-rBa8L6_aq-UQqZlULQ7_-xOQG6A9dK3YARhRW3e3YNYiQ1F4ddpk=w2400',
    
    // AI Tools
    'chatgpt.png': 'https://lh3.googleusercontent.com/pw/AP1GczPjhMHLEGIuF-M96d82N1iWDEKMEfXrDXkB4Q-4hCrI5h1_tWwYk98sPJQJxZ8RVncdHoV07CnrXvzHwsFSKbjwQqJ3WwLpdWJ-bqImFfGb5qUNt4I=w2400',
    'gemini.png': 'https://lh3.googleusercontent.com/pw/AP1GczNuCnZVuYLYHCPiUmweKowbCjUFLoYZj-Kst6eZRY6_aJfBznXqHLG8ImV5HJiHbdEI3oW7F4HNZY4g-EqMH-tMBjMCOm_L8mFDDgCo7GfK0nwACII=w2400',
    'claude.png': 'https://lh3.googleusercontent.com/pw/AP1GczN4dKtK7yhpANqQ-Rr4-oYlB9tTJMPG-RnmgvJEYA9eawrN-_FsAHmAf9rI9r5WUcnf0tRBY2xZAoX-a_nEBxBCrw3KbKSZmDZrw-L7eT1NE7uNfF0=w2400',
    'midjourney.png': 'https://lh3.googleusercontent.com/pw/AP1GczOM2K6I90oYzQQYlF92qzTGkWtCNTOGgxbreZzZqdI6b5tsPo0o43_7xB1wXFc7vVN39A6wBylYPw6CKjz7qWb6-KRZg6Qc_Oi12ZgCHs3A22NcKcE=w2400',
    'dall-e.png': 'https://lh3.googleusercontent.com/pw/AP1GczO65c1l41ORCVVArAq8hQH-RMf-lAoqALohR83Z44U_TKuAJt60FEecGBjHahgCnS7Xkiuw61XxHK6HXvQWpfXMvZ5lsAGhAI3JFY92GNJJ4Bwmb-M=w2400',
    
    // Creative
    'canva.png': 'https://lh3.googleusercontent.com/pw/AP1GczPvyCAB8AdeTJG_ZU3BbvzZRmR7z2_3jvOCsYF5eZE08_lJFhhE1EL1JslLKCo-TTYeUGQvhlOgYiGZDo6W8rWLIx9gDGvx8EHFEROk3-7W1rPFu48=w2400',
    'adobe.png': 'https://lh3.googleusercontent.com/pw/AP1GczOHFVlQYuLxJQM2mEIVQEpsS35sLLMQ3R3xDPSfFk2ieSqGYRIQKN3q8LCsYwHHjKl4Sot8x2kD5tQDNcREg7cxsFpBNHv9TUYJDTKrNLBs6iVjqIs=w2400',
    'figma.png': 'https://lh3.googleusercontent.com/pw/AP1GczMPgYDQvKwLjSrZ3DdHxMHBODZOuVGQTw3uIKBVHm3tqhBzKmFDfMI--OBXqv2S9DYsN4FPaKJmkQ-S1YG8plB-u9HQn5n3Fgf3WiDwusBnP2HwDzc=w2400',
    
    // Entertainment
    'netflix.png': 'https://lh3.googleusercontent.com/pw/AP1GczOtZRfpLa-W8Nn7afDQkWSqPBMWm4qsZ3TCBzwIfvdNL38teMfUFBdXEVs-QaVALnyKgB1KqaKdITd7jZbsc9BqWyTTHi2fXrAHnW4Rz9o8g_p52og=w2400',
    'spotify.png': 'https://lh3.googleusercontent.com/pw/AP1GczNcyV7XQrfyTvYzGkFOAWQ5bRWo3Ea4gESUDEXXU1UcW2AkFBQXQTsJnkGhPOkPXtX45ySn3sMdThgdEJZiIpuQnKTB4Uj3A_kQpI-f1s9E4n9uapA=w2400',
    'youtube.png': 'https://lh3.googleusercontent.com/pw/AP1GczMqj81KW31PxUGQpZGEJagVlJqLnNwTMkiO7ZFmFKzSzrJV_Sgi_N9QtZgSRFYDpMv8NN7zO-ZNsJ7QUfWQ44YRVxiYDYIpVWl3XHKYKpTbTJD9h8I=w2400',
    
    // Office
    'microsoft-365.png': 'https://lh3.googleusercontent.com/pw/AP1GczNmI_-4aVBQiT9MK79QnCTYwOWGbcKEzQTzRFtJzHLsE-ELQ1MkRtYgKmLzkhkN0p6vqoOGh2-_2hSHvgC4XQA_0uMRu9qpZ9m_Ij-CdOUgmvZBfH8=w2400',
    'notion.png': 'https://lh3.googleusercontent.com/pw/AP1GczM0tN7W3eZXx2N0nRfVkGqlSYl4cKv4QMrBdLklcAuI4G_w8O5gNMYkehXMbENrVUzFcWMk_QHmqBTn8xsv7xojBM4RPPwVWWkZJYIQLadrxu9jvyU=w2400',
    'trello.png': 'https://lh3.googleusercontent.com/pw/AP1GczPQqDJ75FxF6Z1hhRYi8BptYO3NGMrJeoyS-5h_fUP-ykLR6x5aKGRDmWwt7z8MXLCxwVZkk5RwNt76PfbTYNTnmAB_VB4DLUfWHD5JchkWuVnS6RE=w2400',
    
    // Security
    'nordvpn.png': 'https://lh3.googleusercontent.com/pw/AP1GczMNIjlx3lmDXyA1QoJCadZyVGxjm6A__b1Foa5m9yRrBW--0BFkjPj4JMvpXeLBQmJLfpJfM2kTVWKXecqLyjX7oxnnFvJg-23BK8QlcH-7k1mnYg0=w2400',
    'expressvpn.png': 'https://lh3.googleusercontent.com/pw/AP1GczOp2OzLBwxQoTRscSXlWB1qlGRtT9wPbzrHQMMzuJ4-oEJ2lK-QKWstZ5KOZxUqM4F5eSdX5ukMSS6r_uTyZKj2oGXE2DHnGgbkwG0FYPbFnl-G33g=w2400',
    'norton.png': 'https://lh3.googleusercontent.com/pw/AP1GczOacG4FdN2KF4vM0OGfKR9bFBHZyoRrKiHdKSK7vBOK6eGzrpmXiF1CYKMj1zPsI-_RDCg7Y3yWKF1q7r13h1ELBdxwc5tLbQyRJw2_BNWC41h31Xo=w2400'
  },
  banners: {
    'google-one-banner.png': 'https://lh3.googleusercontent.com/pw/AP1GczPn3K2n2ltRJHoxVbvENTWX4szCO38agmnTVzwfZJrH0VYl3NHkgLAgNxEKKxoakHVHj3ySRE87Hm8zt1zvbDx4yKILyUVKDswNVYV3SDqcXxyvfpc=w2400',
    'canva-banner.png': 'https://lh3.googleusercontent.com/pw/AP1GczOAMIKb0VC8qoEP_cixG_GCcmY46PhwTZAKH1yp-DnMzgkQ4NluDomN-ZPJ7NQ5gx5-UDNbAqVbdUCYP0eVrHijDMJJj9TgP6BGgKcQSLkH9a96k-w=w2400',
    'ai-tools-banner.png': 'https://lh3.googleusercontent.com/pw/AP1GczNgZTptAIqoyjuuvkVeJf6TE_CUhzKAETWYI3FO25dxsFhWpHSB1Lmzw3LmLBE-GzDPsz55rPXYt8AY0OIGRe_J2Ub3sXYJ5b9JQ14-PYQd0CZVm6s=w2400',
    'office-banner.png': 'https://lh3.googleusercontent.com/pw/AP1GczOkI1HcJCEASn-MnV5xZcSYwbfMDSYM59KrFQC_CsZuE68VisBQKncLe2KeTsDpvfOhyTrzXUzYQU-4I4YG-mH2b-PgzMNfB87ksXbJGfb8VmN4b2Y=w2400',
    'entertainment-banner.png': 'https://lh3.googleusercontent.com/pw/AP1GczN_f-g93iTBQxJ82jXaOGD6ETwCYmoxjDlB-vNdmhcDj3LTkKp5ODBYTd9qMPEEF9fk9x2Nn8m9vVX58jbLRm20Kq-n_s0_QJ0w22HN-iilWCkgkRE=w2400'
  },
  categories: {
    'cloud-storage.png': 'https://lh3.googleusercontent.com/pw/AP1GczNQFAVHhNBCGXUqDv0A1v6qKpKmDQlRKaOsKt48oO6RvmHRpGtIYyZzmuGVF7K3FZVNJ6C3YFB5Jn4NpZRnVGt9Eu8mvt1qKljdNGRaqy4e8-7Jl7I=w2400',
    'ai-tools.png': 'https://lh3.googleusercontent.com/pw/AP1GczPT1KFdGgr5fAd5aPpWb_KcZrDkfUDblDJX0iUYw2e9oUvmLKV7dYuIk-pdTitUeTgP8XXEuMjJA27PoMENz1j-iyalwxJ7yX7yHWd-hy_HTPNc58c=w2400',
    'learning.png': 'https://lh3.googleusercontent.com/pw/AP1GczN8-S81JD5aZT9Fhh0qj6qvXgC2rH4SUXZ23EvCFPvKfOWk9n0Nxh9_kfkexIQrLUMTXAOg3i4svxNSaVIcF8NtbVFx-c6M0iMJ4YOo9s9z-HJGVx8=w2400',
    'entertainment.png': 'https://lh3.googleusercontent.com/pw/AP1GczMnfP0z1Lxw_lTQdBtLNJqXJXdmwn8W00MKisPWfGKAkH_QDIxFOkzB-D_fREKb5OO-UL9h6z4tpqXgvT0rG__jrWmFXbTfXQj9Kij7iCXmcCNyX44=w2400',
    'graphics.png': 'https://lh3.googleusercontent.com/pw/AP1GczO_BK5B6-DKZ_V-7NMOeVnZpLKfkwY1DyJLz7ULVRKfNwMiDjbnhZJ0zz4eSdUcbJb5d0-jWGa1uvWRZfZG7s3l4jlUeNtT5yHIeYIIYgwOgPMHoWM=w2400',
    'security.png': 'https://lh3.googleusercontent.com/pw/AP1GczNpqiXFAUNiJJQXMmY15e0Vr0k6d1lzGTDzibz1ZYaSX5aH3yVA2DvYQc1CuGSxY8X0hM2hMlZd8X9SLcD8qwUiR-_1R0OTvv7BL2t_7OG8cAVk-JI=w2400',
    'office.png': 'https://lh3.googleusercontent.com/pw/AP1GczP1ZMNgKMn7SrYaYMhITQYN_6tNMG6FBCaGsrwA9qYnZq3U9M8Q4YrSCpDUzQMeRsaKFZG9-RaqxcqRGr9B_G1lCY5JLrHqlhxBHJpPo2I6Jx5MaZo=w2400'
  }
};

// Download all images
async function downloadAllImages() {
  try {
    const downloadPromises = [];

    for (const [category, files] of Object.entries(images)) {
      for (const [filename, url] of Object.entries(files)) {
        const filepath = path.join('public/images', category, filename);
        downloadPromises.push(downloadImage(url, filepath));
      }
    }

    await Promise.all(downloadPromises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Run the download process
downloadAllImages(); 