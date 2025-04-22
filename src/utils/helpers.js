/**
 * Định dạng số tiền thành chuỗi tiền tệ
 * @param {number} amount - Số tiền cần định dạng
 * @param {string} currency - Đơn vị tiền tệ (mặc định VND)
 * @returns {string} - Chuỗi tiền tệ đã định dạng
 */
export const formatCurrency = (amount, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Cắt chuỗi văn bản nếu dài hơn độ dài tối đa
 * @param {string} text - Văn bản cần cắt
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} - Văn bản đã cắt với dấu "..." nếu cần
 */
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Tạo slug từ chuỗi
 * @param {string} text - Chuỗi cần tạo slug
 * @returns {string} - Slug đã tạo
 */
export const createSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}; 