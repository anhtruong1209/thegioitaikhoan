/**
 * apiService.js
 * Service để gọi API từ backend thay vì gọi trực tiếp đến các API bên ngoài
 */

const API_BASE_URL = 'https://localhost:9981'; // Cập nhật về cổng đúng

// Hàm lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Hàm lưu token vào localStorage
export const saveAuthToken = (token, userId, expiresAt) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('tokenExpires', expiresAt);
};

// Hàm xóa token khỏi localStorage (logout)
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('tokenExpires');
};

// Hàm kiểm tra token có hợp lệ không
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const expiresAt = localStorage.getItem('tokenExpires');
  
  if (!token || !expiresAt) {
    return false;
  }
  
  // Kiểm tra xem token đã hết hạn chưa
  return new Date() < new Date(expiresAt);
};

// Hàm lấy userId từ localStorage
export const getCurrentUserId = () => {
  return localStorage.getItem('userId');
};

// Tạo header cơ bản với token xác thực
const createAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Gửi yêu cầu tạo nội dung AI đến backend
 * @param {string} modelId - ID của model AI (ví dụ: 'gemini-flash', 'gemini-pro')
 * @param {Array} contents - Nội dung để gửi đến API 
 * @param {Array} safetySettings - Cài đặt an toàn
 * @param {Object} generationConfig - Cấu hình tạo nội dung
 * @returns {Promise} - Kết quả từ API
 */
export const generateContent = async (modelId, contents, safetySettings, generationConfig) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId,
        contents,
        safetySettings,
        generationConfig
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API service error:', error);
    throw error;
  }
};

// ================ QUẢN LÝ NGƯỜI DÙNG ================

/**
 * Đăng ký người dùng mới
 * @param {Object} userData - Thông tin người dùng
 * @returns {Promise} - Thông tin người dùng sau khi đăng ký thành công
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Register error: ${errorData}`);
    }

    const data = await response.json();
    
    // Lưu token khi đăng ký thành công
    if (data.token) {
      saveAuthToken(data.token, data.userId, data.tokenExpires);
    }
    
    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * Đăng nhập người dùng
 * @param {Object} credentials - Thông tin đăng nhập
 * @returns {Promise} - Thông tin người dùng sau khi đăng nhập thành công
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Login error: ${errorData}`);
    }

    const data = await response.json();
    
    // Lưu token khi đăng nhập thành công
    if (data.token) {
      saveAuthToken(data.token, data.userId, data.tokenExpires);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Đăng xuất người dùng
 */
export const logoutUser = () => {
  // Xóa token xác thực
  removeAuthToken();
  
  // Xóa thông tin người dùng
  localStorage.removeItem('user');
  localStorage.removeItem('loginSuccess');
  
  // Xóa bất kỳ dữ liệu phiên làm việc nào khác
  localStorage.removeItem('chatSessions');
  localStorage.removeItem('selectedModel');
};

/**
 * Lấy thông tin người dùng
 * @param {number} userId - ID người dùng
 * @returns {Promise} - Thông tin người dùng
 */
export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get user error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {Promise} - Thông tin người dùng hiện tại
 */
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get current user error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin người dùng
 * @param {number} userId - ID người dùng
 * @param {Object} userData - Thông tin người dùng cần cập nhật
 * @returns {Promise} - Thông tin người dùng sau khi cập nhật
 */
export const updateUserInfo = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Update user error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

// ================ QUẢN LÝ TRÒ CHUYỆN ================

/**
 * Lấy danh sách trò chuyện của người dùng
 * @param {number} userId - ID người dùng
 * @returns {Promise} - Danh sách trò chuyện
 */
export const getUserChats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats/user/${userId}`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get chats error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get chats error:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết một cuộc trò chuyện
 * @param {number} chatId - ID cuộc trò chuyện
 * @returns {Promise} - Chi tiết cuộc trò chuyện
 */
export const getChatDetails = async (chatId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get chat details error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get chat details error:', error);
    throw error;
  }
};

/**
 * Tạo cuộc trò chuyện mới
 * @param {number} userId - ID người dùng
 * @param {Object} chatData - Thông tin cuộc trò chuyện
 * @returns {Promise} - Cuộc trò chuyện đã tạo
 */
export const createChat = async (userId, chatData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        ...chatData,
        userId
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Create chat error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create chat error:', error);
    throw error;
  }
};

/**
 * Cập nhật cuộc trò chuyện
 * @param {number} chatId - ID cuộc trò chuyện
 * @param {Object} chatData - Thông tin cuộc trò chuyện cần cập nhật
 * @returns {Promise} - Cuộc trò chuyện sau khi cập nhật
 */
export const updateChat = async (chatId, chatData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(chatData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Update chat error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update chat error:', error);
    throw error;
  }
};

/**
 * Xóa cuộc trò chuyện
 * @param {number} chatId - ID cuộc trò chuyện cần xóa
 * @returns {Promise} - Kết quả xóa
 */
export const deleteChat = async (chatId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}`, {
      method: 'DELETE',
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Delete chat error: ${errorData}`);
    }

    return true;
  } catch (error) {
    console.error('Delete chat error:', error);
    throw error;
  }
};

/**
 * Thêm tin nhắn mới vào cuộc trò chuyện
 * @param {number} chatId - ID cuộc trò chuyện
 * @param {Object} messageData - Thông tin tin nhắn
 * @returns {Promise} - Tin nhắn đã tạo
 */
export const addMessage = async (chatId, messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        ...messageData,
        chatId
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Add message error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Add message error:', error);
    throw error;
  }
};

// ================ QUẢN LÝ TÀI LIỆU TÙY CHỈNH ================

/**
 * Lấy danh sách kiến thức tùy chỉnh của người dùng
 * @param {number} userId - ID người dùng
 * @returns {Promise} - Danh sách kiến thức tùy chỉnh
 */
export const getUserKnowledge = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/customknowledge/user/${userId}`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get knowledge error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get knowledge error:', error);
    throw error;
  }
};

/**
 * Tạo kiến thức tùy chỉnh mới
 * @param {number} userId - ID người dùng
 * @param {Object} knowledgeData - Thông tin kiến thức
 * @returns {Promise} - Kiến thức đã tạo
 */
export const createKnowledge = async (userId, knowledgeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/customknowledge`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        ...knowledgeData,
        userId
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Create knowledge error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create knowledge error:', error);
    throw error;
  }
};

/**
 * Cập nhật kiến thức tùy chỉnh
 * @param {number} knowledgeId - ID kiến thức
 * @param {Object} knowledgeData - Thông tin kiến thức cần cập nhật
 * @returns {Promise} - Kiến thức sau khi cập nhật
 */
export const updateKnowledge = async (knowledgeId, knowledgeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/customknowledge/${knowledgeId}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(knowledgeData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Update knowledge error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update knowledge error:', error);
    throw error;
  }
};

/**
 * Xóa kiến thức tùy chỉnh
 * @param {number} knowledgeId - ID kiến thức cần xóa
 * @returns {Promise} - Kết quả xóa
 */
export const deleteKnowledge = async (knowledgeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/customknowledge/${knowledgeId}`, {
      method: 'DELETE',
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Delete knowledge error: ${errorData}`);
    }

    return true;
  } catch (error) {
    console.error('Delete knowledge error:', error);
    throw error;
  }
};

// ================ QUẢN LÝ MÔ HÌNH AI ================

/**
 * Lấy danh sách model AI
 * @returns {Promise} - Danh sách model AI
 */
export const getAIModels = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/models`);

    if (!response.ok) {
      console.warn(`API /api/models không có sẵn hoặc lỗi: ${response.status}`);
      return []; // Trả về mảng rỗng thay vì ném lỗi
    }

    return await response.json();
  } catch (error) {
    console.warn('API /api/models không thể truy cập:', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

/**
 * Lấy thông tin model AI
 * @param {string} modelId - ID model
 * @returns {Promise} - Thông tin model
 */
export const getAIModel = async (modelId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/models/${modelId}`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get model error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get model error:', error);
    throw error;
  }
};

/**
 * Lấy danh sách công cụ AI
 * @returns {Promise} - Danh sách các công cụ AI
 */
export const getAITools = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tools`, {
      headers: createAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Get AI tools error: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get AI tools error:', error);
    throw error;
  }
}; 