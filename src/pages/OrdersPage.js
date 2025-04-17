import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Empty,
  Spin,
  Tabs,
  Badge,
  Pagination,
  Tag,
  Tooltip,
  Typography,
  Space,
  Divider
} from 'antd';
import { 
  ShoppingOutlined, 
  EyeOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { getUserOrders } from '../data/mockData';
import { getProductImage } from '../utils/cartUtils';

// Import CSS
import '../styles/Profile.css';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

// Format số tiền thành dạng tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Format đẩt hàng
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Render trạng thái đơn hàng
const renderOrderStatus = (status) => {
  const statusMap = {
    completed: { text: 'Hoàn thành', icon: <CheckCircleOutlined /> },
    processing: { text: 'Đang xử lý', icon: <ClockCircleOutlined /> }
  };
  
  const statusInfo = statusMap[status] || { text: 'Đang xử lý', icon: <ClockCircleOutlined /> };
  
  return (
    <Tag 
      icon={statusInfo.icon}
      color={status === 'completed' ? 'success' : 'processing'}
    >
      {statusInfo.text}
    </Tag>
  );
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  // Lấy danh sách đơn hàng
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        if (parsedUser && parsedUser.isLoggedIn) {
          // Lấy đơn hàng từ mock DB
          const userOrders = getUserOrders(parsedUser.id);
          // Sắp xếp đơn hàng mới nhất lên đầu
          const sortedOrders = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(sortedOrders);
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
  }, [navigate]);
  
  // Lọc đơn hàng theo trạng thái
  const filterOrders = (status) => {
    if (status === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  };
  
  // Xử lý khi thay đổi tab
  const handleTabChange = (key) => {
    setCurrentTab(key);
    setCurrentPage(1); // Reset về trang đầu tiên khi chuyển tab
  };
  
  // Phân trang
  const paginateOrders = (ordersToShow) => {
    const startIndex = (currentPage - 1) * pageSize;
    return ordersToShow.slice(startIndex, startIndex + pageSize);
  };
  
  // Xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Tổng kết các đơn hàng
  const orderSummary = {
    total: orders.length,
    processing: orders.filter(order => order.status === 'processing').length,
    completed: orders.filter(order => order.status === 'completed').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };
  
  // Nếu đang loading, hiển thị spinner
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  // Lọc đơn hàng theo tab hiện tại
  const filteredOrders = filterOrders(currentTab);
  const paginatedOrders = paginateOrders(filteredOrders);
  
  return (
    <div className="profile-container">
      <div className="profile-header" style={{ marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: '0 0 8px 0', color: '#4285f4' }}>
            Đơn hàng của tôi
          </Title>
          <Text type="secondary">
            Quản lý và theo dõi tất cả các đơn hàng của bạn
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<ShoppingOutlined />} 
          onClick={() => navigate('/')}
          size="large"
        >
          Tiếp tục mua sắm
        </Button>
      </div>
      
      {/* Tổng kết đơn hàng */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(to right, #4285f4, #34a853)' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <Title level={4} style={{ color: 'white', margin: '0 0 4px 0' }}>{orderSummary.total}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Tổng đơn hàng</Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <Title level={4} style={{ color: 'white', margin: '0 0 4px 0' }}>{orderSummary.processing}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Đơn đang xử lý</Text>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <Title level={4} style={{ color: 'white', margin: '0 0 4px 0' }}>{formatCurrency(orderSummary.totalSpent)}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Tổng chi tiêu</Text>
            </div>
          </Col>
        </Row>
      </Card>
      
      <Tabs 
        defaultActiveKey="all" 
        className="profile-tabs"
        onChange={handleTabChange}
        type="card"
        size="large"
      >
        <TabPane 
          tab={<span><ShoppingOutlined /> Tất cả đơn hàng</span>} 
          key="all"
        >
          {filteredOrders.length > 0 ? (
            <>
              {paginatedOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
              
              {filteredOrders.length > pageSize && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Pagination 
                    current={currentPage}
                    total={filteredOrders.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty 
              description="Bạn chưa có đơn hàng nào" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <ClockCircleOutlined /> 
              Đang xử lý
              <Badge 
                count={orders.filter(order => order.status === 'processing').length}
                style={{ marginLeft: '5px' }}
              />
            </span>
          } 
          key="processing"
        >
          {filteredOrders.length > 0 ? (
            <>
              {paginatedOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
              
              {filteredOrders.length > pageSize && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Pagination 
                    current={currentPage}
                    total={filteredOrders.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty 
              description="Không có đơn hàng nào đang xử lý" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </TabPane>
        
        <TabPane 
          tab={<span><CheckCircleOutlined /> Hoàn thành</span>} 
          key="completed"
        >
          {filteredOrders.length > 0 ? (
            <>
              {paginatedOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
              
              {filteredOrders.length > pageSize && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Pagination 
                    current={currentPage}
                    total={filteredOrders.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty 
              description="Không có đơn hàng nào đã hoàn thành" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

// Component hiển thị một đơn hàng
const OrderCard = ({ order }) => {
  // Kiểm tra đơn hàng có items không và có ít nhất 1 sản phẩm không
  const hasItems = order.items && order.items.length > 0;
  
  // Tóm tắt sản phẩm
  const itemSummary = !hasItems ? 'Không có sản phẩm' : 
    order.items.length > 1 
      ? `${order.items[0].name} và ${order.items.length - 1} sản phẩm khác` 
      : order.items[0].name;

  // Tổng số lượng sản phẩm
  const totalQuantity = hasItems 
    ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;
  
  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/src/assets/cloud-icon.svg';
  };
  
  return (
    <Card 
      className="order-card" 
      style={{ 
        marginBottom: '16px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
      hoverable
    >
      <div className="order-card-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '12px'
      }}>
        <div>
          <Title level={4} style={{ margin: '0 0 4px 0' }}>
            <ShoppingOutlined style={{ marginRight: '8px', color: '#4285f4' }} />
            Đơn hàng #{order.id}
          </Title>
          <Space size={16}>
            <Text type="secondary">
              <CalendarOutlined style={{ marginRight: '4px' }} />
              {formatDate(order.date)}
            </Text>
            <Text type="secondary">
              <UserOutlined style={{ marginRight: '4px' }} />
              {order.billing?.name || 'Không có thông tin'}
            </Text>
          </Space>
        </div>
        
        <div className="order-status" style={{ display: 'flex', gap: '8px' }}>
          {renderOrderStatus(order.status)}
        </div>
      </div>
      
      <div className="order-card-body" style={{ padding: '8px 0' }}>
        {/* Hiển thị sản phẩm đầu tiên và số lượng sản phẩm còn lại */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div
            style={{ 
              width: '70px', 
              height: '70px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              padding: '4px',
              background: '#f9f9f9'
            }}
          >
            {hasItems ? (
              <img 
                src={order.items[0].image || getProductImage(order.items[0].name)}
                alt={hasItems ? order.items[0].name : 'Sản phẩm'} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain'
                }}
                onError={handleImageError}
              />
            ) : (
              <InfoCircleOutlined style={{ fontSize: '32px', color: '#d9d9d9' }} />
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>
              {itemSummary}
            </Text>
            <Text type="secondary">
              Tổng số: {totalQuantity} sản phẩm 
              {order.items.length > 1 && (
                <Tooltip title={order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}>
                  <InfoCircleOutlined style={{ marginLeft: '8px', cursor: 'pointer' }} />
                </Tooltip>
              )}
            </Text>
          </div>
          
          <div style={{ textAlign: 'right', minWidth: '120px' }}>
            <Text strong style={{ fontSize: '18px', color: '#4285f4', display: 'block' }}>
              {formatCurrency(order.total)}
            </Text>
          </div>
        </div>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <div className="order-footer" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <div>
            {order.notes && (
              <Tooltip title={order.notes}>
                <Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                  <InfoCircleOutlined style={{ marginRight: '4px' }} />
                  Có ghi chú
                </Text>
              </Tooltip>
            )}
          </div>
          
          <div className="order-actions">
            <Space>
              <Button 
                type="primary" 
                icon={<EyeOutlined />}
                onClick={() => alert(`Thông tin đơn hàng #${order.id}`)}
              >
                Chi tiết
              </Button>
              
              {order.status === 'completed' && (
                <Button 
                  type="default" 
                  icon={<DownloadOutlined />}
                >
                  Hóa đơn
                </Button>
              )}
            </Space>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrdersPage; 