import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Table, InputNumber, Space, Divider, Tag, Alert, Empty } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, ArrowRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';

const { Title, Text, Paragraph } = Typography;

// Mô phỏng dữ liệu từ localStorage hoặc trạng thái toàn cục
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được tải
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  // Cập nhật localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (productId, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  // Xử lý xóa toàn bộ giỏ hàng
  const handleClearCart = () => {
    setCart([]);
  };

  // Chuyển đến trang thanh toán
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.priceValue === 'number' 
        ? item.priceValue 
        : parseFloat(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Định dạng số tiền thành VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace(/\s/g, '');
  };

  // Cấu hình cột cho bảng giỏ hàng
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          {record.image && (
            <img 
              src={record.image} 
              alt={text} 
              style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
            />
          )}
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            {record.storage && <div style={{ fontSize: '12px', color: '#666' }}>Dung lượng: {record.storage}</div>}
            {record.type && <div style={{ fontSize: '12px', color: '#666' }}>Loại: {record.type}</div>}
          </div>
        </Space>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontWeight: 'bold' }}>{text}</Text>
          {record.originalPrice && (
            <Text delete type="secondary" style={{ fontSize: '12px' }}>
              {record.originalPrice}
            </Text>
          )}
          {record.discount && (
            <Tag color="red" style={{ marginTop: '4px' }}>
              Giảm {record.discount}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      dataIndex: 'quantity',
      render: (text, record) => (
        <InputNumber
          min={1}
          max={10}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) => {
        const price = typeof record.priceValue === 'number' 
          ? record.priceValue 
          : parseFloat(record.price.replace(/[^\d]/g, ''));
        return <Text strong>{formatCurrency(price * record.quantity)}</Text>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleRemoveItem(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="cart-page-container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={2}>
            <ShoppingCartOutlined /> Giỏ hàng của bạn
          </Title>
          <Divider />
        </Col>

        <Col xs={24} lg={16}>
          {loading ? (
            <Card loading={true} />
          ) : cart.length > 0 ? (
            <Card>
              <Table
                columns={columns}
                dataSource={cart}
                rowKey="id"
                pagination={false}
                locale={{ emptyText: 'Không có sản phẩm nào trong giỏ hàng' }}
              />
              <div style={{ textAlign: 'right', marginTop: '16px' }}>
                <Button 
                  onClick={handleClearCart} 
                  style={{ marginRight: '8px' }}
                >
                  Xóa giỏ hàng
                </Button>
                <Button type="primary" ghost>
                  <Link to="/">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Giỏ hàng của bạn đang trống"
              >
                <Button type="primary">
                  <Link to="/">Khám phá sản phẩm ngay</Link>
                </Button>
              </Empty>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Thông tin đơn hàng" className="order-summary">
            <div className="price-row">
              <span>Tạm tính:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="price-row">
              <span>Giảm giá:</span>
              <span>0₫</span>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className="price-row total">
              <span>Tổng cộng:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              icon={<ArrowRightOutlined />}
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="checkout-button"
            >
              Tiến hành thanh toán
            </Button>

            <Alert
              message="Hỗ trợ tư vấn"
              description={
                <div>
                  <p>Cần tư vấn thêm? Gọi ngay:</p>
                  <p style={{ fontWeight: 'bold' }}>
                    <a href="tel:0832206397">0832206397</a>
                  </p>
                </div>
              }
              type="info"
              showIcon
              icon={<QuestionCircleOutlined />}
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage; 