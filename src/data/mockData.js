// Dữ liệu mẫu cho người dùng và đơn hàng
// Trong ứng dụng thực tế, dữ liệu này sẽ đến từ API
import { LOGO_URLS } from '../data/imageUrls';
export const mockUsers = {
  // user ID là key để dễ dàng tìm kiếm
  '123': {
    id: '123',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    picture: null,
    isLoggedIn: true,
    registeredDate: '2023-05-15',
    // Thông tin bổ sung
    gender: 'male',
    birthdate: '1990-01-15',
    preferences: {
      newsletter: true,
      promotions: true,
      notifications: true
    },
    paymentMethods: [
      {
        id: 'pm1',
        type: 'credit_card',
        name: 'VISA ****1234',
        isDefault: true
      },
      {
        id: 'pm2',
        type: 'bank_transfer',
        name: 'Ngân hàng Vietcombank',
        isDefault: false
      }
    ]
  }
};

export const mockOrders = [
  {
    id: 'ORD-001',
    userId: '123',
    date: '2023-10-15',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    total: 2990000,
    items: [
      {
        id: 'prod-001',
        name: 'Google One 2TB',
        price: 990000, 
        quantity: 1,
        period: '12 tháng',
        image: '/images/logos/google-one.png'
      },
      {
        id: 'prod-002',
        name: 'Netflix Premium',
        price: 2000000,
        quantity: 1,
        period: '12 tháng',
        image: '/images/logos/netflix.png'
      }
    ],
    billing: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM'
    },
    notes: null
  },
  {
    id: 'ORD-002',
    userId: '123',
    date: '2023-11-20',
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    total: 1290000,
    items: [
      {
        id: 'prod-003',
        name: 'Microsoft 365 Family',
        price: 1290000,
        quantity: 1,
        period: '12 tháng',
        image: '/images/logos/microsoft.png'
      }
    ],
    billing: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM'
    },
    notes: null
  },
  {
    id: 'ORD-003',
    userId: '123',
    date: '2024-01-05',
    status: 'processing',
    paymentStatus: 'pending',
    paymentMethod: 'bank_transfer',
    total: 3600000,
    items: [
      {
        id: 'prod-004',
        name: 'Adobe Creative Cloud',
        price: 3600000,
        quantity: 1,
        period: '12 tháng',
        image: '/images/logos/adobe.png'
      }
    ],
    billing: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM'
    },
    notes: 'Cần kích hoạt trước ngày 10/01/2024'
  }
];

// Hàm trợ giúp để lưu và lấy dữ liệu từ localStorage
export const saveUserData = (userData) => {
  try {
    // Lấy dữ liệu hiện tại
    const currentUsers = JSON.parse(localStorage.getItem('mockUsers') || '{}');
    
    // Cập nhật thông tin người dùng
    currentUsers[userData.id] = {
      ...currentUsers[userData.id],
      ...userData
    };
    
    // Lưu lại vào localStorage
    localStorage.setItem('mockUsers', JSON.stringify(currentUsers));
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu người dùng:', error);
    return false;
  }
};

export const getUserData = (userId) => {
  try {
    // Lấy dữ liệu từ localStorage
    const users = JSON.parse(localStorage.getItem('mockUsers') || '{}');
    
    // Nếu người dùng tồn tại, trả về thông tin
    if (users[userId]) {
      return users[userId];
    }
    
    // Nếu không tìm thấy trong localStorage, kiểm tra dữ liệu mẫu
    if (mockUsers[userId]) {
      // Lưu vào localStorage để sử dụng sau này
      saveUserData(mockUsers[userId]);
      return mockUsers[userId];
    }
    
    // Không tìm thấy người dùng
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    return null;
  }
};

// Hàm lưu đơn hàng mới
export const saveOrder = (orderData) => {
  try {
    console.log('Bắt đầu lưu đơn hàng với dữ liệu:', JSON.stringify(orderData, null, 2));
    
    // Kiểm tra dữ liệu đầu vào
    if (!orderData || !orderData.items || !Array.isArray(orderData.items)) {
      console.error('Dữ liệu đơn hàng không hợp lệ:', orderData);
      return null;
    }
    
    // Lấy đơn hàng hiện tại
    const currentOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    
    // Tạo ID đơn hàng mới
    const newOrderId = `ORD-${String(currentOrders.length + 1).padStart(3, '0')}`;
    console.log('Tạo mã đơn hàng mới:', newOrderId);
    
    // Đảm bảo các mục đơn hàng đều có giá dạng số
    const processedItems = orderData.items.map(item => {
      let price = item.price;
      
      // Kiểm tra xem giá đã là số chưa, nếu chưa thì chuyển đổi
      if (typeof price !== 'number') {
        if (typeof price === 'string') {
          price = parseInt(price.replace(/[^\d]/g, ''), 10) || 0;
        } else {
          price = 0;
        }
      }
      
      return {
        ...item,
        id: item.id || `prod-${Math.floor(Math.random() * 10000)}`,
        name: item.name || 'Sản phẩm không tên',
        price, // Giá đã được xử lý thành số
        quantity: item.quantity || 1
      };
    });
    
    // Tính lại tổng giá trị đơn hàng
    const calculatedTotal = processedItems.reduce((total, item) => 
      total + (item.price * (item.quantity || 1)), 0);
    
    // Kiểm tra thông tin người đặt hàng
    const billing = {
      name: orderData.billing?.name || 'Không có tên',
      email: orderData.billing?.email || 'Không có email',
      phone: orderData.billing?.phone || 'Không có số điện thoại',
      address: orderData.billing?.address || 'Không có địa chỉ'
    };
    
    // Tạo đơn hàng mới với ID
    const newOrder = {
      id: newOrderId,
      billing,
      items: processedItems, 
      total: calculatedTotal, // Sử dụng tổng giá trị đã tính lại
      date: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'waiting',
      orderNotes: orderData.orderNotes || '',
      emailSent: true,
      emailContent: {
        sentTo: 'admin@example.com',
        sentDate: new Date().toISOString(),
        subject: `Đơn hàng mới: ${newOrderId}`,
        customerPhone: billing.phone,
        customerEmail: billing.email,
        customerName: billing.name
      }
    };
    
    console.log('Đơn hàng mới đã xử lý:', JSON.stringify(newOrder, null, 2));
    
    // Thêm đơn hàng mới vào danh sách
    const updatedOrders = [...currentOrders, newOrder];
    
    // Lưu lại vào localStorage
    localStorage.setItem('mockOrders', JSON.stringify(updatedOrders));
    console.log('Đã lưu đơn hàng vào localStorage');
    
    // Gửi email thông báo (mô phỏng)
    console.log('Gửi email thông báo đơn hàng mới:');
    console.log(`Subject: Đơn hàng mới ${newOrderId}`);
    console.log(`Thông tin khách hàng: ${billing.name} - ${billing.phone} - ${billing.email}`);
    console.log(`Tổng giá trị: ${calculatedTotal.toLocaleString('vi-VN')} VND`);
    console.log(`Sản phẩm: ${processedItems.map(item => `${item.name} (${item.quantity})`).join(', ')}`);
    
    return newOrder;
  } catch (error) {
    console.error('Lỗi khi lưu đơn hàng:', error);
    return null;
  }
};

export const getUserOrders = (userId) => {
  try {
    // Chỉ lấy đơn hàng từ localStorage
    const storedOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    
    // Lọc đơn hàng theo userId
    return storedOrders.filter(order => order.userId === userId);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng của người dùng:', error);
    return [];
  }
};

export const getOrderDetails = (orderId) => {
  try {
    // Đầu tiên tìm trong localStorage
    const storedOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    const storedOrder = storedOrders.find(order => order.id === orderId);
    
    if (storedOrder) {
      console.log(`Tìm thấy đơn hàng ${orderId} trong localStorage`);
      return storedOrder;
    }
    
    // Nếu không tìm thấy trong localStorage, kiểm tra dữ liệu mẫu
    const mockOrder = mockOrders.find(order => order.id === orderId);
    
    if (mockOrder) {
      console.log(`Tìm thấy đơn hàng ${orderId} trong dữ liệu mẫu`);
      return mockOrder;
    }
    
    console.log(`Không tìm thấy đơn hàng với ID: ${orderId}`);
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
    return null;
  }
};

// Khởi tạo dữ liệu mẫu khi ứng dụng khởi động
export const initializeMockData = () => {
  try {
    // Khởi tạo dữ liệu người dùng mẫu nếu chưa có
    if (!localStorage.getItem('mockUsers')) {
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    }
    
    // KHÔNG khởi tạo đơn hàng mẫu
    // Đảm bảo có mảng đơn hàng trống
    if (!localStorage.getItem('mockOrders')) {
      localStorage.setItem('mockOrders', JSON.stringify([]));
    }
    
    // Kiểm tra nếu người dùng đã đăng nhập qua Google
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user && user.isLoggedIn) {
        // Nếu đây là người dùng mới, tạo bản ghi người dùng mới
        if (!getUserData(user.id)) {
          const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: '',
            address: '',
            picture: user.picture,
            isLoggedIn: true,
            registeredDate: new Date().toISOString().split('T')[0],
            gender: 'male',
            birthdate: '',
            preferences: {
              newsletter: true,
              promotions: true,
              notifications: true
            },
            paymentMethods: []
          };
          
          // Lưu thông tin người dùng mới
          saveUserData(newUser);
        }
      }
    }
  } catch (error) {
    console.error('Lỗi khi khởi tạo dữ liệu mẫu:', error);
  }
};

// Hàm xóa tất cả đơn hàng
export const clearAllOrders = () => {
  try {
    localStorage.removeItem('mockOrders');
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    return false;
  }
};

// Dữ liệu dịch vụ mẫu
const services = [
  {
    id: 'google-one',
    name: 'Google One',
    shortDescription: 'Dịch vụ lưu trữ đám mây từ Google',
    description: 'Dịch vụ lưu trữ đám mây với dung lượng từ 2TB đến 30TB, bảo hành trọn đời, hỗ trợ đa nền tảng và chia sẻ gia đình.',
    image: LOGO_URLS.GOOGLE_ONE,
    price: 249000,
    category: 'cloud-storage'
  },
  {
    id: 'netflix',
    name: 'Netflix Premium',
    shortDescription: 'Tài khoản xem phim 4K, Ultra HD',
    description: 'Tài khoản Netflix Premium chính hãng xem phim chất lượng 4K, Ultra HD trên 4 thiết bị cùng lúc, không quảng cáo.',
    image: LOGO_URLS.NETFLIX,
    price: 299000,
    category: 'entertainment'
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    shortDescription: 'Nghe nhạc không quảng cáo, chất lượng cao',
    description: 'Nghe nhạc không quảng cáo, chất lượng cao, tải về nghe offline, hỗ trợ đa nền tảng và đồng bộ trên nhiều thiết bị.',
    image: LOGO_URLS.SPOTIFY,
    price: 159000,
    category: 'entertainment'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    shortDescription: 'Bộ ứng dụng văn phòng Microsoft',
    description: 'Bộ ứng dụng văn phòng Microsoft Word, Excel, PowerPoint với 6TB OneDrive, cập nhật liên tục phiên bản mới nhất.',
    image: LOGO_URLS.MICROSOFT_365,
    price: 599000,
    category: 'office'
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    shortDescription: 'Trọn bộ công cụ thiết kế chuyên nghiệp',
    description: 'Trọn bộ công cụ thiết kế chuyên nghiệp: Photoshop, Illustrator, Premiere Pro, After Effects và nhiều ứng dụng khác.',
    image: LOGO_URLS.ADOBE,
    price: 899000,
    category: 'graphics'
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    shortDescription: 'Xem YouTube không quảng cáo, phát trong nền',
    description: 'Xem YouTube không quảng cáo, phát nhạc trong nền, tải video về xem offline, truy cập YouTube Music Premium.',
    image: LOGO_URLS.YOUTUBE,
    price: 179000,
    category: 'entertainment'
  }
];

// Hàm lấy tất cả dịch vụ
export const getAllServices = () => {
  return services;
};

// Hàm lấy dịch vụ theo ID
export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

// Hàm lấy dịch vụ theo danh mục
export const getServicesByCategory = (category) => {
  return services.filter(service => service.category === category);
};

// Hàm tìm kiếm dịch vụ theo từ khóa
export const searchServices = (keyword) => {
  const searchTerm = keyword.toLowerCase();
  return services.filter(service => 
    service.name.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.shortDescription.toLowerCase().includes(searchTerm)
  );
};

export default {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  searchServices
}; 