import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/apiService';
import '../styles/LoginDialog.css';

const LoginDialog = ({ isOpen, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Reset form khi đóng dialog
  useEffect(() => {
    if (!isOpen) {
      setCredentials({ username: '', password: '' });
      setError('');
      setLoading(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  // Đóng dialog khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, loading]);

  // Không hiển thị gì nếu dialog không mở
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(credentials);
      
      if (response && response.token) {
        // Chỉ gọi callback chứ không reload trang
        if (onLoginSuccess) {
          onLoginSuccess(response);
        }
        onClose();
      }
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
      console.error('Lỗi đăng nhập:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ngăn sự kiện click của overlay lan sang LoginDialog
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-dialog-overlay" onClick={handleOverlayClick}>
      <div className="login-dialog">
        <div className="login-dialog-header">
          <h2>Đăng nhập</h2>
          <button className="close-button" onClick={onClose} disabled={loading}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">
            <i className="error-icon">⚠️</i> {error}
          </div>}
          
          <div className="form-group">
            <label htmlFor="username">
              <i className="input-icon">👤</i> Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Nhập tên đăng nhập của bạn"
              required
              autoFocus
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <i className="input-icon">🔒</i> Mật khẩu
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu của bạn"
                required
                disabled={loading}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={toggleShowPassword}
                tabIndex="-1"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          
          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Ghi nhớ đăng nhập</label>
            </div>
            <a href="#forgot-password" className="forgot-password">Quên mật khẩu?</a>
          </div>
          
          <div className="dialog-buttons">
            <button type="button" onClick={onClose} disabled={loading}>Hủy</button>
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="loading-text">
                  <span className="dot-animation">Đang đăng nhập</span>
                </span>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>
          
          <div className="login-footer">
            <p>Chưa có tài khoản? <a href="#register">Đăng ký ngay</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog; 