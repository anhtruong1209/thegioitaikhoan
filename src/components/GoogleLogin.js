import React from 'react';
import { GoogleLogin as GoogleOAuthLogin } from '@react-oauth/google';
import { notification } from 'antd';
import { jwtDecode } from 'jwt-decode';

const GoogleLogin = ({ onLoginSuccess }) => {
  // Xử lý khi đăng nhập thành công
  const handleSuccess = (credentialResponse) => {
    try {
      // Giải mã JWT token để lấy thông tin người dùng
      const decodedUser = jwtDecode(credentialResponse.credential);
      
      // Lưu thông tin người dùng vào localStorage hoặc state management
      localStorage.setItem('user', JSON.stringify({
        id: decodedUser.sub,
        email: decodedUser.email,
        name: decodedUser.name,
        picture: decodedUser.picture,
        isLoggedIn: true
      }));
      
      // Hiển thị thông báo đăng nhập thành công
      notification.success({
        message: 'Đăng nhập thành công',
        description: `Chào mừng ${decodedUser.name}!`,
        placement: 'topRight',
      });
      
      // Gọi callback để cập nhật trạng thái đăng nhập ở component cha
      if (onLoginSuccess) {
        onLoginSuccess(decodedUser);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý token:', error);
      handleError();
    }
  };
  
  // Xử lý khi đăng nhập thất bại
  const handleError = () => {
    notification.error({
      message: 'Đăng nhập thất bại',
      description: 'Đã xảy ra lỗi khi đăng nhập bằng Google. Vui lòng thử lại sau.',
      placement: 'topRight',
    });
  };
  
  return (
    <div className="google-login-wrapper">
      <GoogleOAuthLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        shape="rectangular"
        locale="vi"
      />
    </div>
  );
};

export default GoogleLogin; 