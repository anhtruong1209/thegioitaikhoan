/**
 * Utility functions for cart management
 */

/**
 * Get the current cart from localStorage
 * @returns {Array} An array of cart items or empty array if cart doesn't exist
 */
export const getCart = () => {
  try {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

/**
 * Add an item to the cart
 * @param {Object} product The product to add
 * @param {number} quantity The quantity to add
 * @returns {Array} The updated cart
 */
export const addToCart = (product, quantity = 1) => {
  try {
    const cart = getCart();
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        ...product,
        quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return getCart(); // Return current cart on error
  }
};

/**
 * Remove an item from the cart
 * @param {string|number} productId The ID of the product to remove
 * @returns {Array} The updated cart
 */
export const removeFromCart = (productId) => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return getCart(); // Return current cart on error
  }
};

/**
 * Update the quantity of an item in the cart
 * @param {string|number} productId The ID of the product to update
 * @param {number} quantity The new quantity
 * @returns {Array} The updated cart
 */
export const updateCartItemQuantity = (productId, quantity) => {
  try {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    return cart;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return getCart(); // Return current cart on error
  }
};

/**
 * Clear the entire cart
 * @returns {Array} Empty array
 */
export const clearCart = () => {
  try {
    localStorage.setItem('cart', JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return getCart(); // Return current cart on error
  }
};

/**
 * Get the total number of items in the cart
 * @returns {number} Total number of items
 */
export const getCartItemsCount = () => {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
};

/**
 * Calculate the total value of the cart
 * @returns {number} Total cart value
 */
export const getCartTotal = () => {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

/**
 * Lấy ảnh mặc định cho sản phẩm dựa vào tên sản phẩm
 * @param {string} productName Tên sản phẩm
 * @returns {string} Đường dẫn đến ảnh mặc định
 */
export const getProductImage = (productName) => {
  const name = productName ? productName.toLowerCase() : '';
  
  if (name.includes('google')) return '/src/assets/google-one.webp';
  if (name.includes('microsoft')) return '/src/assets/microsoft.png';
  if (name.includes('adobe')) return '/src/assets/adobe-crreative-cloud-1.webp';
  if (name.includes('netflix')) return '/src/assets/netflix.jpeg';
  if (name.includes('gemini')) return '/src/assets/gemini.webp';
  if (name.includes('notebooklm')) return '/src/assets/NotebookLM-Plus.webp';
  if (name.includes('canva')) return '/src/assets/canva.jpeg';
  
  return '/src/assets/cloud-icon.svg';
}; 