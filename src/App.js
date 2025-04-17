import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import { initializeMockData } from './data/mockData';
import { initEmailJS } from './utils/emailUtils';
import './App.css';
import './styles/Menu.css';

// Bảng màu tùy chỉnh - sáng hơn
const customColors = {
  primary: '#4285f4',  // Xanh dương Google
  secondary: '#34a853', // Xanh lá Google
  accent: '#fbbc05',    // Vàng Google
  highlight: '#ea4335', // Đỏ Google 
  dark: '#333333',
  light: '#ffffff'
};

const theme = {
  token: {
    colorPrimary: customColors.primary,
    borderRadius: 8,
  },
};

// ID và khóa EmailJS
const EMAILJS_PUBLIC_KEY = 'MFD4VpF0hQKeezmoE';

function App() {
  // Khởi tạo dữ liệu mock và EmailJS khi ứng dụng khởi động
  useEffect(() => {
    try {
      // Khởi tạo dữ liệu mock
      console.log('Khởi tạo dữ liệu mock...');
      initializeMockData();
      
      // Khởi tạo EmailJS
      console.log('Khởi tạo EmailJS...');
      initEmailJS(EMAILJS_PUBLIC_KEY);
      
      console.log('Khởi tạo ứng dụng hoàn tất');
    } catch (error) {
      console.error('Lỗi khi khởi tạo ứng dụng:', error);
    }
  }, []);
  
  return (
    <ConfigProvider theme={theme} locale={viVN}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Routes cho trang cá nhân */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          
          {/* Chuyển hướng tất cả các đường dẫn không xác định về trang chủ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App; 