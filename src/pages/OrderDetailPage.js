import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card, Descriptions, Tag, Steps, List, Image, Typography, Divider } from 'antd';
import { 
  ShoppingOutlined, 
  EnvironmentOutlined, 
  CreditCardOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  UserOutlined,
  BankOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { getOrderDetails } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatUtils';
import '../styles/Profile.css';
import '../styles/OrderDetailPage.css';

const { Title, Text } = Typography;
const { Step } = Steps;

const renderStatus = (status) => {
  switch (status) {
    case 'completed':
      return <Tag color="success">Hoàn thành</Tag>;
    case 'pending':
      return <Tag color="processing">Đang xử lý</Tag>;
    case 'cancelled':
      return <Tag color="error">Đã hủy</Tag>;
    default:
      return <Tag color="default">Không xác định</Tag>;
  }
};

const renderPaymentStatus = (status) => {
  switch (status) {
    case 'paid':
      return <Tag color="success">Đã thanh toán</Tag>;
    case 'pending':
      return <Tag color="warning">Chờ thanh toán</Tag>;
    case 'failed':
      return <Tag color="error">Thanh toán thất bại</Tag>;
    default:
      return <Tag color="default">Không xác định</Tag>;
  }
};

const getStepStatus = (orderStatus, step) => {
  if (orderStatus === 'cancelled') {
    return step === 0 ? 'finish' : 'error';
  }
  
  const stepMap = {
    'pending': { 0: 'finish', 1: 'process', 2: 'wait', 3: 'wait' },
    'shipping': { 0: 'finish', 1: 'finish', 2: 'process', 3: 'wait' },
    'completed': { 0: 'finish', 1: 'finish', 2: 'finish', 3: 'finish' }
  };
  
  return stepMap[orderStatus]?.[step] || 'wait';
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderDetails(id);
        if (orderData) {
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!order) {
    return <div className="error-container">Đơn hàng không tồn tại</div>;
  }

  const goBack = () => {
    navigate('/user/orders');
  };

  // Calculate order summary
  const subtotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + order.shippingFee - order.discount;

  return (
    <div className="order-detail-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Title level={3}>Chi tiết đơn hàng #{order.orderNumber}</Title>
        <Button onClick={goBack}>Quay lại danh sách đơn hàng</Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={24}>
          <Card className="profile-card">
            <Descriptions title={<span><UserOutlined /> Thông tin khách hàng</span>} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Họ tên">{order.customerName}</Descriptions.Item>
              <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{order.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{order.address}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">{formatDate(order.orderDate)}</Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">{order.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái đơn hàng">{renderStatus(order.status)}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái thanh toán">{renderPaymentStatus(order.paymentStatus)}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Steps current={order.status === 'completed' ? 3 : order.status === 'shipping' ? 2 : 1}>
            <Step 
              status={getStepStatus(order.status, 0)} 
              title="Đặt hàng" 
              description="Đơn hàng đã được tạo"
              icon={<ShoppingOutlined />}
            />
            <Step 
              status={getStepStatus(order.status, 1)} 
              title="Xác nhận" 
              description="Đơn hàng đã được xác nhận"
              icon={<CheckCircleOutlined />}
            />
            <Step 
              status={getStepStatus(order.status, 2)} 
              title="Vận chuyển" 
              description="Đơn hàng đang giao"
              icon={<EnvironmentOutlined />}
            />
            <Step 
              status={getStepStatus(order.status, 3)} 
              title="Hoàn thành" 
              description="Đơn hàng đã giao thành công"
              icon={<CreditCardOutlined />}
            />
          </Steps>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card 
            title={<span><ShoppingOutlined /> Thông tin đơn hàng</span>}
            className="order-items-card"
          >
            <List
              dataSource={order.items}
              renderItem={item => (
                <List.Item className="order-item">
                  <div className="order-item-container">
                    <div className="order-item-image">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                        fallback="https://via.placeholder.com/80"
                      />
                    </div>
                    <div className="order-item-details">
                      <div className="order-item-name">
                        <Text strong>{item.name}</Text>
                        <div>
                          <Text type="secondary">Danh mục: {item.category}</Text>
                        </div>
                      </div>
                      <div className="order-item-price">
                        <Text>{formatCurrency(item.price)}</Text>
                        <Text>Số lượng: {item.quantity}</Text>
                        <Text strong>Tổng: {formatCurrency(item.price * item.quantity)}</Text>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
              footer={
                <div className="order-summary">
                  <div className="order-summary-item">
                    <Text>Tạm tính:</Text>
                    <Text>{formatCurrency(subtotal)}</Text>
                  </div>
                  <div className="order-summary-item">
                    <Text>Phí vận chuyển:</Text>
                    <Text>{formatCurrency(order.shippingFee)}</Text>
                  </div>
                  <div className="order-summary-item">
                    <Text>Giảm giá:</Text>
                    <Text>-{formatCurrency(order.discount)}</Text>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <div className="order-summary-item total">
                    <Title level={5} style={{ margin: 0 }}>Tổng thanh toán:</Title>
                    <Title level={5} style={{ margin: 0, color: '#ff4d4f' }}>{formatCurrency(total)}</Title>
                  </div>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {order.note && (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24}>
            <Card title={<span><ClockCircleOutlined /> Ghi chú đơn hàng</span>}>
              <p>{order.note}</p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderDetailPage; 