import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import GoogleLogin from './GoogleLogin';

const LoginModal = ({ visible, onCancel, onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' hoặc 'register'

  // Xử lý đăng nhập bằng email/mật khẩu
  const handleSubmit = (values) => {
    setLoading(true);
    
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      
      if (activeTab === 'login') {
        // Mock đăng nhập thành công
        const mockUser = {
          id: '123',
          name: values.email.split('@')[0],
          email: values.email,
          isLoggedIn: true
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        notification.success({
          message: 'Đăng nhập thành công',
          description: `Chào mừng ${mockUser.name}!`,
          placement: 'topRight'
        });
        
        if (onLoginSuccess) {
          onLoginSuccess(mockUser);
        }
        onCancel();
      } else {
        // Mock đăng ký thành công
        notification.success({
          message: 'Đăng ký thành công',
          description: 'Vui lòng đăng nhập với tài khoản mới của bạn.',
          placement: 'topRight'
        });
        setActiveTab('login');
        form.resetFields();
      }
    }, 1500);
  };

  // Xử lý khi đăng nhập Google thành công
  const handleGoogleLoginSuccess = (user) => {
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
    onCancel();
  };

  return (
    <Modal
      title={activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <div className="login-tabs">
        <div 
          className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Đăng nhập
        </div>
        <div 
          className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Đăng ký
        </div>
      </div>

      <Form
        form={form}
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        {activeTab === 'register' && (
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Họ tên" />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>

        {activeTab === 'register' && (
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>
            {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </Button>
        </Form.Item>

        <Divider plain>Hoặc đăng nhập với</Divider>
        
        <div className="social-login-container">
          <GoogleLogin onLoginSuccess={handleGoogleLoginSuccess} />
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal; 