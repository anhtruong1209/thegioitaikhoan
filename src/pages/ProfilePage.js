import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Radio, 
  DatePicker, 
  Upload, 
  Avatar, 
  Row, 
  Col, 
  Card, 
  notification,
  Switch,
  Empty,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
  BellOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getUserData, saveUserData } from '../data/mockData';

// Import CSS
import '../styles/Profile.css';

const { TabPane } = Tabs;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  
  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        if (parsedUser && parsedUser.isLoggedIn) {
          // Lấy thông tin chi tiết từ mock DB
          const userDetails = getUserData(parsedUser.id);
          
          if (userDetails) {
            setUser(userDetails);
            // Khởi tạo giá trị form
            profileForm.setFieldsValue({
              name: userDetails.name,
              email: userDetails.email,
              phone: userDetails.phone || '',
              address: userDetails.address || '',
              gender: userDetails.gender || 'male',
              birthdate: userDetails.birthdate ? dayjs(userDetails.birthdate) : null,
              newsletter: userDetails.preferences?.newsletter ?? true,
              promotions: userDetails.preferences?.promotions ?? true,
              notifications: userDetails.preferences?.notifications ?? true
            });
          }
        } else {
          // Nếu không đăng nhập, chuyển hướng về trang đăng nhập
          navigate('/');
        }
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu người dùng:', error);
        navigate('/');
      }
    } else {
      // Nếu không có thông tin người dùng, chuyển hướng về trang đăng nhập
      navigate('/');
    }
    
    setLoading(false);
  }, [navigate, profileForm]);
  
  // Lưu thông tin profile
  const handleProfileSubmit = (values) => {
    if (!user) return;
    
    setLoading(true);
    
    // Cập nhật dữ liệu người dùng
    const updatedUser = {
      ...user,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      gender: values.gender,
      birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : null,
      preferences: {
        newsletter: values.newsletter,
        promotions: values.promotions,
        notifications: values.notifications
      }
    };
    
    // Lưu vào localStorage
    saveUserData(updatedUser);
    
    // Cập nhật thông tin đăng nhập
    const loginUser = JSON.parse(localStorage.getItem('user'));
    loginUser.name = values.name;
    loginUser.email = values.email;
    localStorage.setItem('user', JSON.stringify(loginUser));
    
    // Cập nhật state
    setUser(updatedUser);
    setEditMode(false);
    setLoading(false);
    
    // Hiển thị thông báo thành công
    notification.success({
      message: 'Cập nhật thành công',
      description: 'Thông tin cá nhân của bạn đã được cập nhật.',
      placement: 'topRight'
    });
  };
  
  // Xử lý đổi mật khẩu
  const handlePasswordSubmit = (values) => {
    setLoading(true);
    
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      passwordForm.resetFields();
      
      notification.success({
        message: 'Đổi mật khẩu thành công',
        description: 'Mật khẩu của bạn đã được cập nhật.',
        placement: 'topRight'
      });
    }, 1000);
  };
  
  // Xử lý cập nhật ảnh đại diện
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Giả lập upload thành công
      // Trong thực tế, URL sẽ từ response của server
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      
      // Cập nhật avatar
      const updatedUser = {
        ...user,
        picture: imageUrl
      };
      
      // Lưu vào localStorage
      saveUserData(updatedUser);
      
      // Cập nhật thông tin đăng nhập
      const loginUser = JSON.parse(localStorage.getItem('user'));
      loginUser.picture = imageUrl;
      localStorage.setItem('user', JSON.stringify(loginUser));
      
      // Cập nhật state
      setUser(updatedUser);
      
      notification.success({
        message: 'Cập nhật ảnh đại diện thành công',
        placement: 'topRight'
      });
    }
  };
  
  // Nếu đang loading, hiển thị spinner
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  // Nếu không có thông tin người dùng, hiển thị thông báo
  if (!user) {
    return (
      <div className="profile-container">
        <Empty 
          description="Vui lòng đăng nhập để xem thông tin cá nhân" 
          buttonText="Đăng nhập ngay"
          buttonType="primary"
          onButtonClick={() => navigate('/')}
        />
      </div>
    );
  }
  
  // Format date từ user data
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).format('DD/MM/YYYY');
  };
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Thông tin cá nhân</h1>
        <p className="profile-subtitle">Quản lý thông tin tài khoản và cài đặt</p>
      </div>
      
      <Tabs defaultActiveKey="info" className="profile-tabs">
        <TabPane 
          tab={<span><UserOutlined /> Thông tin cá nhân</span>} 
          key="info"
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card className="profile-card">
                <div className="profile-avatar-wrapper">
                  <Avatar 
                    src={user.picture} 
                    icon={<UserOutlined />} 
                    size={120} 
                    className="profile-avatar"
                  />
                  <Upload 
                    name="avatar"
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 500);
                    }}
                    onChange={handleAvatarChange}
                  >
                    <Button 
                      icon={<CameraOutlined />} 
                      className="profile-upload-btn"
                    >
                      Thay đổi ảnh
                    </Button>
                  </Upload>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>Thành viên từ: {formatDate(user.registeredDate)}</p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={24} md={16} lg={18}>
              <Card 
                className="profile-card" 
                title="Thông tin tài khoản" 
                extra={
                  editMode ? (
                    <Button 
                      type="primary" 
                      icon={<SaveOutlined />} 
                      onClick={() => profileForm.submit()}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button 
                      type="default" 
                      icon={<EditOutlined />} 
                      onClick={() => setEditMode(true)}
                    >
                      Chỉnh sửa
                    </Button>
                  )
                }
              >
                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={handleProfileSubmit}
                  disabled={!editMode}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Họ tên" />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email!' },
                          { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                      >
                        <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="gender"
                        label="Giới tính"
                      >
                        <Radio.Group>
                          <Radio value="male">Nam</Radio>
                          <Radio value="female">Nữ</Radio>
                          <Radio value="other">Khác</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="birthdate"
                        label="Ngày sinh"
                      >
                        <DatePicker 
                          style={{ width: '100%' }} 
                          format="DD/MM/YYYY"
                          placeholder="Chọn ngày sinh"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item
                        name="address"
                        label="Địa chỉ"
                      >
                        <Input.TextArea 
                          prefix={<HomeOutlined />} 
                          placeholder="Địa chỉ" 
                          rows={3}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
              
              <Card className="profile-card" title="Cài đặt thông báo">
                <Form
                  form={profileForm}
                  layout="vertical"
                  disabled={!editMode}
                >
                  <Form.Item
                    name="newsletter"
                    valuePropName="checked"
                  >
                    <Switch 
                      checkedChildren="Bật" 
                      unCheckedChildren="Tắt" 
                    /> Nhận thông tin khuyến mãi qua email
                  </Form.Item>
                  
                  <Form.Item
                    name="promotions"
                    valuePropName="checked"
                  >
                    <Switch 
                      checkedChildren="Bật" 
                      unCheckedChildren="Tắt" 
                    /> Nhận thông báo về sản phẩm mới
                  </Form.Item>
                  
                  <Form.Item
                    name="notifications"
                    valuePropName="checked"
                  >
                    <Switch 
                      checkedChildren="Bật" 
                      unCheckedChildren="Tắt" 
                    /> Nhận thông báo về trạng thái đơn hàng
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={<span><LockOutlined /> Bảo mật</span>} 
          key="security"
        >
          <Card className="profile-card" title="Đổi mật khẩu">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordSubmit}
            >
              <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Mật khẩu hiện tại" 
                />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                  { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Mật khẩu mới"
                />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Xác nhận mật khẩu mới"
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cập nhật mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
          
          <Card className="profile-card" title="Đăng nhập và bảo mật">
            <div className="profile-section">
              <h3 className="profile-section-title">Đăng nhập hai yếu tố</h3>
              <p>Bảo vệ tài khoản của bạn bằng cách yêu cầu xác thực thêm khi đăng nhập.</p>
              <Button type="default" icon={<BellOutlined />}>
                Thiết lập xác thực hai yếu tố
              </Button>
            </div>
            
            <div className="profile-section">
              <h3 className="profile-section-title">Phiên đăng nhập</h3>
              <p>Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn.</p>
              <Button type="default">
                Xem tất cả phiên đăng nhập
              </Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage; 