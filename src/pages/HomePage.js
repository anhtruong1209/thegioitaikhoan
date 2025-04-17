import React, { useState } from 'react';
import { Typography, Row, Col, Card, Button, Divider, Tag, List, Avatar, message, Carousel, Space, Badge, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CloudOutlined, 
  CheckCircleOutlined, 
  PhoneOutlined,
  RightOutlined,
  StarOutlined,
  FireOutlined,
  SafetyOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
  RobotOutlined,
  VideoCameraOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

// Import image URL constants
import { LOGO_URLS, BANNER_URLS, CATEGORY_URLS } from '../data/imageUrls';

const { Title, Paragraph } = Typography;

// Gói Google One
const googleOnePackages = [
  {
    id: 1,
    name: "Gói 2TB",
    storage: "2TB",
    price: "249,000₫",
    priceValue: 249000,
    originalPrice: "350,000₫",
    discount: "29%",
    image: LOGO_URLS.GOOGLE_ONE
  },
  {
    id: 2,
    name: "Gói 5TB",
    storage: "5TB",
    price: "349,000₫",
    priceValue: 349000,
    originalPrice: "500,000₫",
    discount: "30%",
    image: LOGO_URLS.GOOGLE_ONE
  },
  {
    id: 3,
    name: "Gói 10TB",
    storage: "10TB",
    price: "449,000₫",
    priceValue: 449000,
    originalPrice: "650,000₫",
    discount: "31%",
    isPopular: true,
    image: LOGO_URLS.GOOGLE_ONE
  },
  {
    id: 4,
    name: "Gói 20TB",
    storage: "20TB",
    price: "549,000₫",
    priceValue: 549000,
    originalPrice: "800,000₫",
    discount: "31%",
    image: LOGO_URLS.GOOGLE_ONE
  },
  {
    id: 5,
    name: "Gói 30TB",
    storage: "30TB",
    price: "649,000₫",
    priceValue: 649000,
    originalPrice: "950,000₫",
    discount: "32%",
    image: LOGO_URLS.GOOGLE_ONE
  }
];

const features = [
  "Tài khoản chính chủ – nâng cấp trực tiếp trên Gmail của bạn",
  "Cam kết sử dụng lâu dài, ổn định",
  "Hỗ trợ tận tình trong suốt quá trình sử dụng",
  "Bảo hành trọn đời tài khoản",
  "Kích hoạt nhanh chóng trong vòng 24h"
];

// Danh mục sản phẩm
const categories = [
  {
    key: 'cloud-storage',
    title: 'Lưu trữ đám mây',
    icon: <CloudOutlined style={{ color: '#4285f4' }} />,
    description: 'Google One, OneDrive, iCloud...',
    color: '#4285f4',
    available: true,
    subCategories: [
      { key: 'google-one', label: 'Google One', available: true },
      { key: 'onedrive', label: 'OneDrive', available: false },
      { key: 'icloud', label: 'iCloud', available: false },
      { key: 'dropbox', label: 'Dropbox', available: false }
    ]
  },
  {
    key: 'learning',
    title: 'Học tập',
    icon: <BulbOutlined style={{ color: '#34a853' }} />,
    description: 'Khóa học và ứng dụng học tập',
    color: '#34a853',
    available: false,
    subCategories: [
      { key: 'language', label: 'Học ngoại ngữ', available: false },
      { key: 'courses', label: 'Khóa học giá rẻ', available: false }
    ]
  },
  {
    key: 'ai-tools',
    title: 'Công cụ AI',
    icon: <RobotOutlined style={{ color: '#ea4335' }} />,
    description: 'ChatGPT, Midjourney và nhiều công cụ AI khác',
    color: '#ea4335',
    available: false,
    subCategories: [
      { key: 'chatgpt', label: 'Chat GPT - OpenAI', available: false },
      { key: 'midjourney', label: 'Midjourney', available: false },
      { key: 'gemini', label: 'Gemini Advanced', available: false },
      { key: 'notebooklm', label: 'NotebookLM Plus', available: false }
    ]
  },
  {
    key: 'entertainment',
    title: 'Giải trí',
    icon: <CustomerServiceOutlined style={{ color: '#fbbc05' }} />,
    description: 'Youtube, Spotify, Netflix và nhiều dịch vụ khác',
    color: '#fbbc05',
    available: false,
    subCategories: [
      { key: 'youtube', label: 'Youtube Premium', available: false },
      { key: 'spotify', label: 'Spotify Premium', available: false },
      { key: 'netflix', label: 'Netflix', available: false }
    ]
  },
  {
    key: 'graphics',
    title: 'Đồ họa',
    icon: <VideoCameraOutlined style={{ color: '#ff6b6b' }} />,
    description: 'Adobe, Canva Pro, Capcut Pro và các công cụ đồ họa khác',
    color: '#ff6b6b',
    available: false,
    subCategories: [
      { key: 'adobe', label: 'Adobe', available: false },
      { key: 'canva', label: 'Canva Pro', available: false }
    ]
  },
  {
    key: 'security',
    title: 'Bảo mật',
    icon: <SafetyOutlined style={{ color: '#4c6ef5' }} />,
    description: 'VPN, phần mềm diệt virus và dịch vụ bảo mật',
    color: '#4c6ef5',
    available: false,
    subCategories: [
      { key: 'vpn', label: 'Key, Phần mềm VPN', available: false },
      { key: 'antivirus', label: 'Phần mềm chống virus', available: false }
    ]
  },
  {
    key: 'office',
    title: 'Office',
    icon: <ToolOutlined style={{ color: '#be4bdb' }} />,
    description: 'Office 365, Zoom Pro và các ứng dụng văn phòng',
    color: '#be4bdb',
    available: false,
    subCategories: [
      { key: 'microsoft-office', label: 'Microsoft Office 365', available: false },
      { key: 'zoom', label: 'Zoom Pro', available: false }
    ]
  }
];

// Banner data với service ID tương ứng
const banners = [
  {
    title: "Google One - Dung lượng lớn, giá hợp lý",
    description: "Nâng cấp dung lượng lưu trữ với Google One từ 2TB đến 30TB",
    image: BANNER_URLS.GOOGLE_ONE_BANNER,
    color: "linear-gradient(135deg, #4285f4, #34a853)",
    buttonText: "Mua ngay",
    serviceId: "google-one"
  },
  {
    title: "Google Drive - Lưu trữ an toàn mọi tập tin",
    description: "Lưu trữ và chia sẻ tập tin dễ dàng, truy cập mọi lúc mọi nơi",
    image: LOGO_URLS.GOOGLE_DRIVE,
    color: "linear-gradient(135deg, #4285f4, #0f9d58)",
    buttonText: "Tìm hiểu thêm",
    serviceId: "google-drive"
  },
  {
    title: "Adobe Creative Cloud - Bộ công cụ sáng tạo",
    description: "Trọn bộ công cụ thiết kế và sáng tạo từ Adobe với giá cực tốt",
    image: LOGO_URLS.ADOBE,
    color: "linear-gradient(135deg, #fa0f00, #a30c00)",
    buttonText: "Khám phá ngay",
    serviceId: "adobe-creative-cloud"
  },
  {
    title: "Gemini Advanced - AI tiên tiến nhất của Google",
    description: "Trải nghiệm mô hình AI tiên tiến với khả năng đa phương thức",
    image: LOGO_URLS.GEMINI,
    color: "linear-gradient(135deg, #8e44ad, #4c1d95)",
    buttonText: "Khám phá ngay",
    serviceId: "gemini-advanced"
  },
  {
    title: "NotebookLM Plus - Trợ lý nghiên cứu AI",
    description: "Tăng cường năng suất nghiên cứu và sáng tạo nội dung",
    image: CATEGORY_URLS.LEARNING,
    color: "linear-gradient(135deg, #16a085, #2c3e50)",
    buttonText: "Khám phá ngay",
    serviceId: "notebooklm-plus"
  }
];

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('cloud-storage');
  const [selectedSubCategory, setSelectedSubCategory] = useState('google-one');
  const navigate = useNavigate();

  const handlePurchase = (product) => {
    // Thêm sản phẩm vào giỏ hàng
    const cartItem = {
      ...product,
      id: product.id || Date.now(), // Đảm bảo có id cho mỗi sản phẩm
      quantity: 1,
    };
    
    // Lấy giỏ hàng hiện tại từ localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
      existingCart.push(cartItem);
    }
    
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Hiển thị thông báo thành công
    message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    
    // Lưu sản phẩm được chọn vào state để hiển thị trong card liên hệ
    setSelectedProduct(product);
    
    // Điều hướng đến trang giỏ hàng
    navigate('/cart');
  };

  const handleCategorySelect = ({ key }) => {
    setSelectedCategory(key);
    // Tìm và chọn subcategory đầu tiên có sẵn
    const category = categories.find(cat => cat.key === key);
    if (category && category.subCategories.length > 0) {
      const availableSubCategory = category.subCategories.find(sub => sub.available) || category.subCategories[0];
      setSelectedSubCategory(availableSubCategory.key);
    }
  };

  const handleSubCategorySelect = ({ key }) => {
    setSelectedSubCategory(key);
  };

  // Tìm category hiện tại
  const currentCategory = categories.find(cat => cat.key === selectedCategory);

  return (
    <div className="home-page" style={{ padding: '20px 0' }}>
      {/* Banner Slider */}
      <Carousel autoplay effect="fade" style={{ marginBottom: '40px' }} dotPosition="bottom" autoplaySpeed={5000}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div style={{ 
              background: banner.color, 
              borderRadius: '12px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              height: '360px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={14}>
                  <div style={{ textAlign: 'left' }}>
                    <Title level={1} style={{ color: 'white', marginBottom: '16px', fontSize: '2.5rem' }}>
                      {banner.title}
                    </Title>
                    <Paragraph style={{ color: 'white', fontSize: '18px', marginBottom: '24px' }}>
                      {banner.description}
                    </Paragraph>
                    <Button 
                      size="large" 
                      style={{ 
                        background: 'white', 
                        color: banner.color.includes('4285f4') ? '#4285f4' : 
                               banner.color.includes('0f9d58') ? '#0f9d58' : 
                               banner.color.includes('fa0f00') ? '#fa0f00' : 
                               banner.color.includes('8e44ad') ? '#8e44ad' : '#16a085', 
                        fontWeight: 'bold',
                        height: '46px',
                        fontSize: '16px',
                        borderRadius: '23px',
                        padding: '0 28px'
                      }}
                      onClick={() => {
                        if (banner.serviceId === 'google-one' || banner.serviceId === 'google-drive' || banner.serviceId === 'adobe-creative-cloud' || banner.serviceId === 'gemini-advanced' || banner.serviceId === 'notebooklm-plus') {
                          navigate(`/service/${banner.serviceId}`);
                        } else {
                          message.info(`${banner.title} sẽ sớm ra mắt! Vui lòng quay lại sau.`);
                        }
                      }}
                    >
                      {banner.buttonText} <RightOutlined />
                    </Button>
                  </div>
                </Col>
                <Col xs={24} md={10}>
        <div style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '220px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                        background: banner.title.includes('Google One') ? 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' : 'transparent',
                        padding: banner.title.includes('Google One') ? '15px' : '0',
                        borderRadius: banner.title.includes('Google One') ? '12px' : '0'
                      }} 
                    />
                  </div>
                </Col>
              </Row>
            </div>
        </div>
        ))}
      </Carousel>

      {/* Main Content - 30/70 Layout */}
      <Row gutter={[24, 24]}>
        {/* Sidebar Categories - 30% */}
        <Col xs={24} md={8} lg={6}>
          <Card 
            className="category-sidebar"
            title={
              <div style={{ fontSize: '18px', color: '#333' }}>
                <AppstoreOutlined style={{ marginRight: '8px' }} />
                Danh Mục Sản Phẩm
                </div>
              }
            style={{ marginBottom: '20px' }}
            bodyStyle={{ padding: '0' }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedCategory]}
              defaultOpenKeys={['cloud-storage']}
              style={{ border: 'none' }}
              onClick={handleCategorySelect}
            >
              {categories.map(category => (
                <Menu.Item 
                  key={category.key}
                  icon={category.icon}
                  disabled={!category.available}
                  style={{ 
                    padding: '16px 24px',
                    height: 'auto',
                    lineHeight: '1.5',
                    position: 'relative'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{category.title}</span>
                    {!category.available && (
                      <Tag style={{ marginLeft: '8px', fontSize: '12px', lineHeight: '1', padding: '2px 6px' }}>
                        <ClockCircleOutlined style={{ marginRight: '4px' }} />
                        Sắp ra mắt
                      </Tag>
                    )}
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                      {category.description}
                    </div>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          </Card>

          {/* Contact Card */}
          <Card
            title={<span style={{ fontSize: '16px' }}><PhoneOutlined style={{ marginRight: '8px' }} /> Liên Hệ Đặt Hàng</span>}
            style={{ borderRadius: '8px' }}
          >
            {selectedProduct ? (
              <>
                <Paragraph style={{ fontSize: '16px' }}>
                  <strong>Gói đã chọn:</strong> {selectedProduct.name}
                </Paragraph>
                <Paragraph style={{ fontSize: '16px' }}>
                  <strong>Giá tiền:</strong> {selectedProduct.price}
                </Paragraph>
                <Divider />
              </>
            ) : (
              <Paragraph style={{ fontSize: '14px' }}>
                Vui lòng chọn gói dịch vụ phù hợp với nhu cầu của bạn
              </Paragraph>
            )}
            
            <Paragraph style={{ fontSize: '18px', fontWeight: 'bold' }}>
              <strong>Hotline:</strong> <a href="tel:0832206397" style={{ color: '#4285f4' }}><PhoneOutlined /> 0832206397</a>
            </Paragraph>
            <Paragraph style={{ fontSize: '14px' }}>
              Liên hệ với chúng tôi qua số điện thoại để được hỗ trợ đặt hàng và kích hoạt tài khoản nhanh chóng.
          </Paragraph>
            
            <div style={{ marginTop: '16px' }}>
              <Tag color="success" style={{ padding: '4px 8px', marginBottom: '8px', fontSize: '12px' }}>Thanh toán đơn giản</Tag>
              <Tag color="processing" style={{ padding: '4px 8px', marginBottom: '8px', fontSize: '12px' }}>Hỗ trợ 24/7</Tag>
              <Tag color="purple" style={{ padding: '4px 8px', marginBottom: '8px', fontSize: '12px' }}>Bảo hành trọn đời</Tag>
            </div>
          </Card>
        </Col>
        
        {/* Main Content - 70% */}
        <Col xs={24} md={16} lg={18}>
          {/* Sub-category menu */}
          {currentCategory && currentCategory.subCategories && currentCategory.subCategories.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <Menu
                mode="horizontal"
                selectedKeys={[selectedSubCategory]}
                onClick={handleSubCategorySelect}
                style={{ borderBottom: '2px solid #f0f0f0' }}
              >
                {currentCategory.subCategories.map(subCat => (
                  <Menu.Item 
                    key={subCat.key} 
                    disabled={!subCat.available}
                    style={{ marginRight: '24px', paddingLeft: '0', paddingRight: '0' }}
                  >
                    {subCat.label}
                    {!subCat.available && (
                      <small style={{ marginLeft: '6px', color: '#999', fontSize: '12px' }}>
                        (Sắp có)
                      </small>
                    )}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          )}

          {/* Google One Content */}
          {selectedSubCategory === 'google-one' && (
            <>
              {/* Google One Packages */}
              <Title level={2} style={{ marginBottom: '16px', color: '#4285f4' }}>
                Gói Dung Lượng Google One Linh Hoạt
              </Title>
              <Paragraph style={{ fontSize: '16px', marginBottom: '40px' }}>
                Giá siêu ưu đãi - Tài khoản chính chủ - Sử dụng lâu dài
              </Paragraph>

              <Row gutter={[24, 24]} justify="center">
                {googleOnePackages.map(product => (
                  <Col xs={24} sm={12} md={12} lg={8} key={product.id}>
                    <Badge.Ribbon text="Phổ biến nhất" color="#ea4335" style={{ display: product.isPopular ? 'block' : 'none' }}>
                      <Card
                        hoverable
                        className="product-card"
                        style={{
                          height: '100%',
                          border: selectedProduct?.id === product.id ? '2px solid #4285f4' : '1px solid #f0f0f0',
                          transform: product.isPopular ? 'scale(1.05)' : 'scale(1)',
                          zIndex: product.isPopular ? 1 : 0,
                          boxShadow: product.isPopular ? '0 10px 30px rgba(66, 133, 244, 0.2)' : 'none'
                        }}
                      >
                        <Row gutter={[16, 0]} align="middle">
                          <Col span={8}>
                            <div style={{ padding: '0 0 16px' }}>
                              <div style={{
                                background: 'linear-gradient(135deg, #4285f4, #34a853)',
                                borderRadius: '50%',
                                padding: '10px',
                                width: '100px',
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto'
                              }}>
                                <img 
                                  src={product.image}
                                  alt={product.name}
                                  style={{ width: '80%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col span={16}>
                            <div style={{ 
                              background: product.isPopular ? 'linear-gradient(135deg, #4285f4, #137333)' : 'linear-gradient(135deg, #4285f4, #34a853)', 
                              padding: '16px',
                              borderRadius: '8px',
                              textAlign: 'center',
                              color: 'white',
                              position: 'relative',
                              marginBottom: '16px'
                            }}>
                              {product.discount && (
                                <div style={{ 
                                  position: 'absolute', 
                                  top: '8px', 
                                  right: '8px', 
                                  background: '#ea4335',
                                  color: 'white',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: 'bold'
                                }}>
                                  -{product.discount}
                                </div>
                              )}
                              <Title level={2} style={{ color: 'white', margin: '0', fontSize: '28px' }}>
                                {product.storage}
                              </Title>
                            </div>
        </Col>
                        </Row>
                        <div style={{ textAlign: 'center', padding: '0' }}>
                          <Title level={3} style={{ margin: '0 0 8px', color: '#333' }}>
                            {product.name}
                          </Title>
                          <div>
                            {product.originalPrice && (
                              <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
                                {product.originalPrice}
                              </span>
                            )}
                            <Title level={2} style={{ display: 'inline', margin: '0', color: '#4285f4' }}>
                              {product.price}
                            </Title>
                          </div>
                          <Button 
                            type="primary" 
                            size="large" 
                            block
                            style={{ 
                              marginTop: '16px', 
                              height: '46px', 
                              fontSize: '16px',
                              background: product.isPopular ? '#34a853' : '#4285f4',
                            }}
                            onClick={() => handlePurchase(product)}
                            icon={<ShoppingCartOutlined />}
                          >
                            Mua Ngay
                          </Button>
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  </Col>
                ))}
      </Row>

              {/* Tính năng và lợi ích */}
              <div style={{ marginTop: '50px', marginBottom: '30px' }}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                  <StarOutlined style={{ color: '#fbbc05', marginRight: '8px' }} />
                  Lợi Ích Khi Mua Google One
                </Title>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <Card style={{ height: '100%' }}>
                      <List
                        itemLayout="horizontal"
                        dataSource={features}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar icon={<CheckCircleOutlined />} style={{ backgroundColor: '#34a853' }} />}
                              title={<span style={{ fontSize: '16px' }}>{item}</span>}
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
          </Col>
                  <Col xs={24} lg={12}>
                    <Card style={{ height: '100%' }}>
                      <div style={{ padding: '0 0 20px', textAlign: 'center' }}>
                        <div style={{ 
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: 'linear-gradient(135deg, #4285f4, #34a853)',
                          borderRadius: '12px',
                          padding: '20px',
                          width: '200px',
                          height: '200px',
                          margin: '0 auto 20px'
                        }}>
                          <img 
                            src={LOGO_URLS.GOOGLE_ONE} 
                            alt="Google One Logo" 
                            style={{ 
                              width: '150px',
                              objectFit: 'contain',
                              margin: '0 auto',
                              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                            }}
                          />
                        </div>
                        <Paragraph style={{ fontSize: '16px' }}>
                          Google One là dịch vụ đám mây của Google cung cấp không gian lưu trữ mở rộng cho Google Drive, Gmail và Google Photos, cùng với các tính năng bổ sung như hỗ trợ của chuyên gia và khả năng chia sẻ với gia đình.
                        </Paragraph>
                        <Button type="primary" size="large" style={{ marginTop: '10px' }} onClick={() => navigate('/service/google-one')}>
                          Tìm hiểu thêm về Google One
                        </Button>
                      </div>
                    </Card>
          </Col>
        </Row>
              </div>
            </>
          )}

          {/* Placeholder for other sub-categories */}
          {selectedSubCategory !== 'google-one' && (
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 0', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px dashed #ddd'
            }}>
              <ClockCircleOutlined style={{ fontSize: '48px', color: '#bbb', marginBottom: '20px' }} />
              <Title level={3} style={{ color: '#666' }}>Nội dung đang được cập nhật</Title>
              <Paragraph style={{ color: '#888' }}>
                Chúng tôi đang chuẩn bị nội dung tốt nhất cho dịch vụ này. Vui lòng quay lại sau!
              </Paragraph>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 