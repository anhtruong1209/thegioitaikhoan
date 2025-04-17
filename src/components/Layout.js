import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Drawer, Dropdown, Space, Row, Col, Badge, Avatar, Divider } from 'antd';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  MenuOutlined,
  CloudOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  UserOutlined,
  RobotOutlined,
  BookOutlined,
  PlayCircleOutlined,
  SearchOutlined,
  LaptopOutlined,
  SafetyOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  HeartOutlined,
  CloseOutlined,
  LoginOutlined
} from '@ant-design/icons';
import CategoryMenu from './CategoryMenu';
import LoginModal from './LoginModal';
import { getCartItemsCount } from '../utils/cartUtils';

// Import site logo directly
import siteLogo from '../assets/images/google-one.webp';

// Import CSS
import '../styles/Layout.css';
import '../styles/Auth.css';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

// Các danh mục điều hướng với danh mục con
const navigationItems = [
  {
    key: 'cloud',
    icon: <CloudOutlined />,
    label: 'Lưu trữ đám mây',
    children: [
      { key: 'google-one', label: 'Google One' },
      { key: 'dropbox', label: 'Dropbox' },
      { key: 'onedrive', label: 'OneDrive' },
      { key: 'icloud', label: 'iCloud' }
    ]
  },
  {
    key: 'ai-tools',
    icon: <RobotOutlined />,
    label: 'Công cụ AI',
    children: [
      { key: 'chatgpt', label: 'ChatGPT' },
      { key: 'midjourney', label: 'Midjourney' },
      { key: 'claude', label: 'Claude' },
      { key: 'gemini', label: 'Gemini' }
    ]
  },
  {
    key: 'learning',
    icon: <BookOutlined />,
    label: 'Học tập',
    children: [
      { key: 'skillshare', label: 'Skillshare' },
      { key: 'udemy', label: 'Udemy' },
      { key: 'masterclass', label: 'MasterClass' },
      { key: 'coursera', label: 'Coursera' }
    ]
  },
  {
    key: 'entertainment',
    icon: <PlayCircleOutlined />,
    label: 'Giải trí',
    children: [
      { key: 'netflix', label: 'Netflix' },
      { key: 'spotify', label: 'Spotify' },
      { key: 'youtube', label: 'YouTube Premium' },
      { key: 'disney', label: 'Disney+' }
    ]
  },
  {
    key: 'office',
    icon: <LaptopOutlined />,
    label: 'Văn phòng',
    children: [
      { key: 'microsoft365', label: 'Microsoft 365' },
      { key: 'adobe', label: 'Adobe Creative Cloud' },
      { key: 'canva', label: 'Canva Pro' }
    ]
  },
  {
    key: 'security',
    icon: <SafetyOutlined />,
    label: 'Bảo mật',
    children: [
      { key: 'vpn', label: 'Dịch vụ VPN' },
      { key: 'antivirus', label: 'Phần mềm diệt virus' },
      { key: 'password', label: 'Quản lý mật khẩu' }
    ]
  }
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  
  // Đường dẫn hiện tại cho việc chọn menu
  const currentPath = location.pathname;

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.isLoggedIn) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu người dùng:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Theo dõi thay đổi số lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemsCount());
    };

    // Cập nhật lần đầu
    updateCartCount();

    // Lắng nghe sự kiện lưu trữ thay đổi
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);

    // Kiểm tra giỏ hàng định kỳ (phòng trường hợp thay đổi từ component khác)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Xử lý điều hướng
  const handleMenuClick = ({ key }) => {
    navigate(key);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Bật/tắt menu di động
  const showDrawer = () => {
    setMobileMenuOpen(true);
  };

  const onClose = () => {
    setMobileMenuOpen(false);
  };

  // Mở modal đăng nhập
  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  // Đóng modal đăng nhập
  const handleLoginModalCancel = () => {
    setLoginModalVisible(false);
  };

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Menu dropdown cho người dùng đã đăng nhập
  const userMenu = [
    {
      key: 'header',
      type: 'group',
      label: (
        <div className="user-dropdown-header">
          <Avatar 
            src={user?.picture || null} 
            icon={<UserOutlined />} 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'profile',
      label: 'Thông tin tài khoản',
      icon: <UserOutlined />
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      danger: true,
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      className: 'logout-item',
      onClick: handleLogout
    }
  ];

  // Thêm link trang chủ vào đầu
  const menuItems = [
    {
      key: 'home',
      label: (
        <Link to="/">
          <Space>
            <HomeOutlined />
            Trang chủ
          </Space>
        </Link>
      )
    },
    {
      key: 'products',
      label: (
        <Link to="/products">
          <Space>
            <AppstoreOutlined />
            Sản phẩm
          </Space>
        </Link>
      )
    },
    {
      key: 'about',
      label: (
        <Link to="/about">
          <Space>
            <InfoCircleOutlined />
            Giới thiệu
          </Space>
        </Link>
      )
    },
    {
      key: 'contact',
      label: (
        <Link to="/contact">
          <Space>
            <PhoneOutlined />
            Liên hệ
          </Space>
        </Link>
      )
    }
  ];

  const renderMenu = (mode = 'horizontal') => (
    <Menu
      mode={mode}
      selectedKeys={[currentPath]}
      className={`main-menu ${mode === 'inline' ? 'mobile-menu' : ''}`}
    >
      {navigationItems.map(item => (
        <SubMenu key={item.key} title={item.label}>
          {item.children.map(child => (
            <Menu.Item key={`/${item.key}/${child.key}`}>
              <Link to={`/${item.key}/${child.key}`}>{child.label}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="header">
        {/* Logo và tên thương hiệu */}
        <div className="logo-container">
          <Link to="/">
            <img src={siteLogo} alt="Logo Thế Giới Tài Khoản" className="logo" />
            <span className="brand-name">Thế Giới Tài Khoản</span>
          </Link>
        </div>

        {/* Thanh tìm kiếm - đã loại bỏ */}
        <div className="search-container">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
          <Button type="primary" className="search-button">
            <SearchOutlined />
          </Button>
        </div>

        {/* Menu máy tính */}
        <div className="menu-container">
          <Menu
            mode="horizontal"
            selectedKeys={[currentPath]}
            items={menuItems}
            className="desktop-menu"
          />
        </div>

        {/* Biểu tượng người dùng */}
        <div className="user-actions">
          <Badge count={cartCount} size="small" offset={[-2, 2]}>
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined />} 
              className="action-button"
              onClick={() => navigate('/cart')}
            >
              Giỏ hàng
            </Button>
          </Badge>
          
          {user ? (
            <Dropdown 
              menu={{ items: userMenu }} 
              placement="bottomRight" 
              overlayClassName="user-dropdown-menu"
            >
              <div className="user-profile-button">
                {user.picture ? (
                  <Avatar src={user.picture} className="user-avatar-header" />
                ) : (
                  <Button 
                    type="text" 
                    icon={<UserOutlined />} 
                    className="action-button"
                  >
                    {user.name}
                    <DownOutlined style={{ fontSize: '12px', marginLeft: '5px' }} />
                  </Button>
                )}
              </div>
            </Dropdown>
          ) : (
            <Button 
              type="text" 
              icon={<UserOutlined />} 
              className="action-button"
              onClick={showLoginModal}
            >
              Tài khoản
            </Button>
          )}
        </div>

        {/* Nút menu di động */}
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />
      </Header>

      {/* Ngăn menu di động */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={mobileMenuOpen}
        className="mobile-drawer"
      >
        {renderMenu('inline')}
        
        <div className="mobile-actions" style={{ padding: '16px' }}>
          <Badge count={cartCount} size="small">
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              onClick={() => {
                navigate('/cart');
                onClose();
              }}
              style={{ marginRight: '8px' }}
            >
              Giỏ hàng
            </Button>
          </Badge>
          
          {user ? (
            <Button 
              icon={<UserOutlined />}
              onClick={() => {
                navigate('/profile');
                onClose();
              }}
            >
              {user.name}
            </Button>
          ) : (
            <Button 
              icon={<UserOutlined />}
              onClick={() => {
                setLoginModalVisible(true);
                onClose();
              }}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </Drawer>

      <Content className="content">
        <Outlet />
      </Content>

      <Footer className="footer">
        <div className="footer-content">
          <Row gutter={[48, 32]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div className="footer-logo">
                <img src={siteLogo} alt="Logo Thế Giới Tài Khoản" className="logo" />
                <h3>Thế Giới Tài Khoản</h3>
              </div>
              <p>Dịch vụ cung cấp tài khoản lưu trữ đám mây chính hãng với giá cả phải chăng.</p>
              <p><strong>Email:</strong> <a href="mailto:support@thegioi-taikhoan.com">support@thegioi-taikhoan.com</a></p>
              <p><strong>Điện thoại:</strong> <a href="tel:+84832206397">0832 206 397</a></p>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <h3>Dịch Vụ Phổ Biến</h3>
              <ul className="footer-links">
                <li><Link to="/products/google-one">Google One</Link></li>
                <li><Link to="/products/microsoft365">Microsoft 365</Link></li>
                <li><Link to="/products/chatgpt">ChatGPT</Link></li>
                <li><Link to="/products/spotify">Spotify Premium</Link></li>
                <li><Link to="/products/netflix">Netflix</Link></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <h3>Liên Kết Nhanh</h3>
              <ul className="footer-links">
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/products">Sản phẩm</Link></li>
                <li><Link to="/about">Giới thiệu</Link></li>
                <li><Link to="/contact">Liên hệ</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <h3>Hỗ Trợ</h3>
              <ul className="footer-links">
                <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
                <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                <li><Link to="/refund">Chính sách hoàn tiền</Link></li>
              </ul>
            </Col>
          </Row>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Thế Giới Tài Khoản. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </Footer>

      {/* Modal đăng nhập */}
      <LoginModal 
        visible={loginModalVisible} 
        onCancel={handleLoginModalCancel}
        onLoginSuccess={handleLoginSuccess}
      />
    </Layout>
  );
};

export default MainLayout; 