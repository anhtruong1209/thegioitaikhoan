import emailjs from '@emailjs/browser';

/**
 * Initialize EmailJS with your public key
 * This should be called once when your app loads
 * @param {string} publicKey - Your EmailJS public key
 */
export const initEmailJS = (publicKey) => {
  try {
    emailjs.init(publicKey);
  } catch (error) {
    console.error('Lỗi khi khởi tạo EmailJS:', error);
  }
};

/**
 * Chuyển đổi giá trị thành số
 * @param {any} price - Giá có thể là string hoặc number
 * @returns {number} - Giá đã được chuyển đổi thành số
 */
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    try {
      // Loại bỏ tất cả ký tự không phải số
      const numericValue = price.replace(/[^\d]/g, '');
      return numericValue ? parseInt(numericValue, 10) : 0;
    } catch (error) {
      console.error('Lỗi khi phân tích giá:', error);
      return 0;
    }
  }
  return 0;
};

/**
 * Định dạng giá thành VND
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} - Chuỗi đã định dạng theo kiểu tiền VND
 */
const formatCurrency = (amount) => {
  try {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount).replace(/\s/g, '');
  } catch (error) {
    console.error('Lỗi khi định dạng tiền tệ:', error);
    return amount + '₫';
  }
};

/**
 * Kiểm tra giá trị không xác định hoặc rỗng và trả về giá trị mặc định nếu cần
 * @param {any} value - Giá trị cần kiểm tra
 * @param {string} defaultValue - Giá trị mặc định nếu value không hợp lệ
 * @returns {string} - Giá trị hợp lệ hoặc giá trị mặc định
 */
const ensureValue = (value, defaultValue = 'Không có thông tin') => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value;
};

/**
 * Gửi email thông báo với timeout
 * @param {string} serviceId - ID dịch vụ EmailJS
 * @param {string} templateId - ID template EmailJS
 * @param {Object} params - Các tham số cho template
 * @param {number} timeout - Thời gian chờ tối đa (ms)
 * @returns {Promise} - Promise kết quả gửi email
 */
const sendEmailWithTimeout = (serviceId, templateId, params, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    // Thiết lập timeout
    const timeoutId = setTimeout(() => {
      reject(new Error('Quá thời gian chờ khi gửi email. Vui lòng thử lại sau.'));
    }, timeout);
    
    // Gửi email
    emailjs.send(serviceId, templateId, params)
      .then((response) => {
        clearTimeout(timeoutId); // Xóa timeout khi thành công
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId); // Xóa timeout khi lỗi
        reject(error);
      });
  });
};

/**
 * Send order confirmation email to admin
 * @param {Object} orderData - The order data object
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendOrderNotificationEmail = async (orderData) => {
  try {
    // Lấy ServiceID và TemplateID từ biến môi trường
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      throw new Error('Thiếu service ID hoặc template ID của EmailJS trong biến môi trường');
    }
    
    // Kiểm tra dữ liệu đơn hàng có hợp lệ không
    if (!orderData || typeof orderData !== 'object') {
      throw new Error('Dữ liệu đơn hàng không hợp lệ');
    }
    
    // Kiểm tra tất cả các trường thông tin của đơn hàng
    const safeOrderData = {
      id: ensureValue(orderData.id, 'ORD-UNKNOWN'),
      date: new Date().toLocaleString('vi-VN'),
      billing: {
        name: ensureValue(orderData.billing?.name),
        email: ensureValue(orderData.billing?.email),
        phone: ensureValue(orderData.billing?.phone),
        address: ensureValue(orderData.billing?.address)
      },
      items: Array.isArray(orderData.items) ? orderData.items : [],
      orderNotes: ensureValue(orderData.orderNotes, 'Không có ghi chú')
    };
    
    // Kiểm tra nếu không có items nào
    if (safeOrderData.items.length === 0) {
      throw new Error('Đơn hàng không có sản phẩm nào');
    }
    
    // Tính toán lại tổng tiền để đảm bảo chính xác
    const calculatedTotal = safeOrderData.items.reduce((total, item) => {
      const itemPrice = parsePrice(item.price);
      const quantity = item.quantity || 1;
      return total + (itemPrice * quantity);
    }, 0);
    
    // Chuẩn bị các mục hàng với định dạng giá đúng
    const formattedItems = safeOrderData.items.map(item => {
      const itemPrice = parsePrice(item.price);
      const quantity = item.quantity || 1;
      const totalItemPrice = itemPrice * quantity;
      const itemName = ensureValue(item.name, 'Sản phẩm không xác định');
      return `${itemName} (${quantity}) - ${formatCurrency(totalItemPrice)}`;
    }).join(', ');
    
    // Prepare the template parameters
    const templateParams = {
      order_id: safeOrderData.id,
      order_date: safeOrderData.date,
      customer_name: safeOrderData.billing.name,
      customer_email: safeOrderData.billing.email,
      customer_phone: safeOrderData.billing.phone,
      customer_address: safeOrderData.billing.address,
      order_total: formatCurrency(calculatedTotal),
      order_items: formattedItems,
      order_notes: safeOrderData.orderNotes
    };
    
    // Gửi email với timeout 15 giây
    const response = await sendEmailWithTimeout(
      serviceId, 
      templateId, 
      templateParams, 
      15000
    );
    
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    throw error;
  }
}; 