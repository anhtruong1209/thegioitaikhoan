import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Card, message, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/apiService';

const { Title, Text } = Typography;

// Bảng màu tùy chỉnh
const customColors = {
  primary: '#6a11cb',
  secondary: '#2575fc',
  accent: '#fc5c7d',
  dark: '#1a1a2e',
  light: '#f8f9fa'
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await loginUser(values);
      
      message.success('Đăng nhập thành công');
      
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify({
        id: response.userId,
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role
      }));
      
      // Lưu trạng thái đăng nhập mới
      localStorage.setItem('loginSuccess', 'true');
      
      // Chuyển hướng đến trang chủ
      navigate('/');
    } catch (error) {
      setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ 
      height: '100vh',
      background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <Card className="login-card" style={{ 
        width: '100%',
        maxWidth: '900px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <Row>
          {/* Phần minh họa */}
          <Col xs={0} md={12} style={{ 
            background: `linear-gradient(to right, ${customColors.primary}99, ${customColors.secondary}99)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.2,
              backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
            <RocketOutlined style={{ 
              fontSize: '80px',
              color: 'white',
              marginBottom: '20px',
              zIndex: 1
            }} />
            <Title level={2} style={{ 
              color: 'white', 
              marginBottom: '20px',
              zIndex: 1,
              textAlign: 'center'
            }}>
              AI MAGIC
            </Title>
            <Text style={{ 
              color: 'white', 
              fontSize: '16px',
              textAlign: 'center',
              zIndex: 1
            }}>
              Nền tảng trí tuệ nhân tạo hàng đầu dành cho bạn
            </Text>
          </Col>
          
          {/* Phần form đăng nhập */}
          <Col xs={24} md={12} style={{ 
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Title level={2} style={{ 
                background: `linear-gradient(to right, ${customColors.primary}, ${customColors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                Đăng Nhập
              </Title>
              <Text type="secondary">Đăng nhập để trải nghiệm sức mạnh AI</Text>
            </div>
            
            {error && (
              <Alert 
                message="Lỗi đăng nhập" 
                description={error} 
                type="error" 
                showIcon 
                style={{ marginBottom: '20px' }} 
              />
            )}
            
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
              >
                <Input 
                  prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Tên đăng nhập" 
                  size="large"
                  style={{ borderRadius: '8px', height: '45px' }}
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="site-form-item-icon" />} 
                  placeholder="Mật khẩu" 
                  size="large"
                  style={{ borderRadius: '8px', height: '45px' }}
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading} 
                  block
                  style={{ 
                    height: '45px', 
                    borderRadius: '8px',
                    background: `linear-gradient(to right, ${customColors.primary}, ${customColors.secondary})`,
                    marginTop: '10px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginPage; 