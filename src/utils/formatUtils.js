/**
 * Utility functions for formatting values like currency, dates, etc.
 */

/**
 * Format a number as Vietnamese currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) {
    return '0 ₫';
  }
  
  // Make sure amount is a number
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    maximumFractionDigits: 0 
  }).format(numAmount);
};

/**
 * Format a date string or Date object to a localized date string
 * @param {string|Date} dateInput - Date string or Date object to format
 * @param {boolean} includeTime - Whether to include time in the formatted string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput, includeTime = true) => {
  if (!dateInput) {
    return 'N/A';
  }
  
  try {
    const date = new Date(dateInput);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return date.toLocaleDateString('vi-VN', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error';
  }
};

/**
 * Format a phone number to a readable format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  
  // Keep only digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on Vietnamese phone number pattern
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  } else if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  
  // Return as is if not matching standard patterns
  return phone;
};

/**
 * Format a number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number with thousands separator
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) {
    return '0';
  }
  
  return new Intl.NumberFormat('vi-VN').format(num);
};

/**
 * Truncate text to a maximum length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + '...';
}; 