import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel, Card, Typography, Space, Rate, Button, Badge, message } from 'antd';
import { RightOutlined, CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import '../styles/ProductSlider.css';

const { Title, Text } = Typography;

const ProductSlider = ({ products, title }) => {
  const navigate = useNavigate();
  
  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product, event) => {
    // Ngăn chặn sự kiện lan truyền lên thẻ cha (Card)
    event.stopPropagation();
    
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
    
    // Điều hướng đến trang giỏ hàng
    navigate('/cart');
  };
  
  // Xử lý click vào card sản phẩm
  const handleCardClick = (product) => {
    navigate(`/products/${product.slug}`);
  };

  const responsive = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className="product-slider-container">
      <div className="section-header">
        <Title level={4} className="section-title">{title}</Title>
        <Link to="/products" className="view-all-link">
          Xem tất cả <RightOutlined />
        </Link>
      </div>

      <Carousel
        arrows
        dots={false}
        infinite
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
        responsive={responsive}
        className="product-carousel"
      >
        {products.map((product, index) => (
          <div key={index} className="carousel-item">
            <Card
              hoverable
              className="product-card"
              onClick={() => handleCardClick(product)}
              cover={
                <div className="img-container">
                  <img alt={product.name} src={product.image} />
                  {product.discount && (
                    <Badge.Ribbon text={`-${product.discount}`} color="red" className="discount-badge" />
                  )}
                </div>
              }
            >
              <Badge.Ribbon 
                text={product.badge} 
                color={product.badgeColor || '#f50'} 
                style={{ display: product.badge ? 'block' : 'none' }}
              >
                <Title level={5} className="product-name">{product.name}</Title>
              </Badge.Ribbon>
              
              {!product.badge && (
                <Title level={5} className="product-name">{product.name}</Title>
              )}
              
              <div className="product-rating">
                <Rate disabled defaultValue={product.rating} allowHalf />
                <Text type="secondary" className="review-count">({product.reviews} đánh giá)</Text>
              </div>
              
              <div className="product-description">
                {product.features && product.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <CheckOutlined style={{ color: '#34A853' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="product-price-container">
                {product.discount ? (
                  <Space direction="vertical" size={0} className="price-space">
                    <Text className="original-price">${product.originalPrice}</Text>
                    <Title level={4} className="discounted-price">
                      ${product.price}
                    </Title>
                  </Space>
                ) : (
                  <Title level={4} className="product-price">
                    ${product.price}/{product.billingPeriod || 'năm'}
                  </Title>
                )}
              </div>
              
              <div className="product-actions">
                <Button 
                  type="primary" 
                  block 
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Mua ngay
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider; 