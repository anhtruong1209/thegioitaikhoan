import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Form, Input, Select, Divider, Steps, Radio, Space, message, Alert, notification } from 'antd';
import { ShoppingCartOutlined, UserOutlined, CreditCardOutlined, CheckCircleOutlined, ArrowLeftOutlined, LockOutlined, PhoneOutlined, MailOutlined, HomeOutlined, WhatsAppOutlined, SendOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';
import { getCart, clearCart } from '../utils/cartUtils';
import { saveOrder } from '../data/mockData';
import { sendOrderNotificationEmail } from '../utils/emailUtils';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formValues, setFormValues] = useState({});

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được tải
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart.length === 0) {
          // Nếu giỏ hàng trống, quay lại trang giỏ hàng
          navigate('/cart');
          return;
        }
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        navigate('/cart');
      }
    } else {
      // Nếu không có giỏ hàng, quay lại trang chủ
      navigate('/cart');
    }
  }, [navigate]);

  // Tính tổng tiền
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Định dạng số tiền thành VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace(/\s/g, '');
  };

  const next = () => {
    form.validateFields().then((values) => {
      // Lưu giá trị form vào state
      setFormValues(values);
      console.log('Đã lưu giá trị form:', values);
      setCurrentStep(currentStep + 1);
    }).catch(err => {
      console.log('Validate Failed:', err);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOrderConfirm = async () => {
    try {
      setLoading(true);
      
      // Sử dụng giá trị form từ state thay vì từ form
      const values = formValues;
      console.log('Bắt đầu xử lý đặt hàng với dữ liệu:', values);
      
      // Lấy thông tin giỏ hàng
      const cartItems = getCart();
      console.log('Giỏ hàng hiện tại:', cartItems);
      
      if (!cartItems || cartItems.length === 0) {
        notification.error({
          message: 'Giỏ hàng trống',
          description: 'Giỏ hàng của bạn không có sản phẩm nào.',
          duration: 5
        });
        setLoading(false);
        return;
      }
      
      // Đảm bảo tính toán đúng giá (chuyển đổi từ string sang number nếu cần)
      const processedCartItems = cartItems.map(item => {
        let itemPrice = item.price;
        // Nếu giá là string, chuyển đổi thành số
        if (typeof itemPrice === 'string') {
          itemPrice = parseInt(itemPrice.replace(/[^\d]/g, ''), 10) || 0;
        } else if (typeof itemPrice !== 'number') {
          itemPrice = 0;
        }
        
        return {
          ...item,
          name: item.name || 'Sản phẩm không tên',
          price: itemPrice, // Giá đã được chuyển thành số
          quantity: item.quantity || 1
        };
      });
      
      console.log('Giỏ hàng đã xử lý:', processedCartItems);
      
      // Tính tổng tiền chính xác từ các mặt hàng đã xử lý
      const totalAmount = processedCartItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0);
      
      console.log('Tổng tiền:', totalAmount);
      
      // Kiểm tra các giá trị thông tin khách hàng
      if (!values.name || !values.email || !values.phone || !values.address) {
        notification.error({
          message: 'Thiếu thông tin',
          description: 'Vui lòng điền đầy đủ thông tin của bạn để tiếp tục.',
          duration: 5
        });
        setLoading(false);
        return;
      }
      
      // Tạo đối tượng đơn hàng
      const orderData = {
        billing: {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          address: values.address.trim()
        },
        items: processedCartItems,
        total: totalAmount,
        orderNotes: values.notes ? values.notes.trim() : ''
      };
      
      console.log('Dữ liệu đơn hàng trước khi lưu:', JSON.stringify(orderData, null, 2));
      
      // Lưu đơn hàng
      const newOrder = saveOrder(orderData);
      
      if (newOrder) {
        console.log('Đơn hàng đã được lưu thành công:', JSON.stringify(newOrder, null, 2));
        
        // Lưu mã đơn hàng để hiển thị trên trang xác nhận
        setOrderId(newOrder.id);
        
        // Gửi email thông báo đến admin
        try {
          console.log('Bắt đầu gửi email thông báo với dữ liệu đơn hàng:', JSON.stringify(newOrder, null, 2));
          
          const emailResult = await sendOrderNotificationEmail(newOrder);
          console.log('Email đã được gửi thành công:', emailResult);
          
          // Thông báo đặt hàng thành công
          notification.success({
            message: 'Đặt hàng thành công',
            description: `Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn qua Zalo theo số điện thoại đã cung cấp để xác nhận đơn hàng.`,
            duration: 5
          });
          
          // Xóa giỏ hàng sau khi đặt hàng và gửi email thành công
          clearCart();
          
          // Chuyển sang trang xác nhận đơn hàng
          setCurrentStep(2);
        } catch (emailError) {
          console.error('Lỗi khi gửi email thông báo:', emailError);
          
          // Vẫn chuyển sang trang xác nhận vì đơn hàng đã được lưu
          notification.warning({
            message: 'Đặt hàng thành công nhưng không gửi được email',
            description: `Đơn hàng của bạn đã được tiếp nhận nhưng có lỗi khi gửi email thông báo. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.`,
            duration: 5
          });
          
          // Xóa giỏ hàng sau khi đặt hàng thành công
          clearCart();
          
          // Chuyển sang trang xác nhận đơn hàng
          setCurrentStep(2);
        }
      } else {
        console.error('Lỗi khi lưu đơn hàng: saveOrder trả về null hoặc undefined');
        notification.error({
          message: 'Đặt hàng thất bại',
          description: 'Có lỗi xảy ra khi xử lý đơn hàng của bạn. Vui lòng thử lại sau.',
          duration: 5
        });
      }
    } catch (error) {
      console.error('Lỗi khi xử lý đơn hàng:', error);
      notification.error({
        message: 'Đặt hàng thất bại',
        description: `Lỗi: ${error.message || 'Không xác định'}. Vui lòng thử lại sau.`,
        duration: 5
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Thông tin',
      icon: <UserOutlined />,
      content: (
        <>
          <Title level={4}>Thông tin khách hàng</Title>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ paymentMethod: 'contact' }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại (Zalo)"
                  name="phone"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/, message: 'Số điện thoại không hợp lệ' }
                  ]}
                  extra="Vui lòng cung cấp số điện thoại có sử dụng Zalo"
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại (Zalo)" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              label="Ghi chú đơn hàng"
              name="notes"
            >
              <Input.TextArea rows={4} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian thuận tiện để liên hệ, yêu cầu đặc biệt, v.v." />
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: 'Xác nhận',
      icon: <CheckCircleOutlined />,
      content: (
        <>
          <Title level={4}>Xác nhận thông tin</Title>
          <Alert
            message="Phương thức liên hệ"
            description={
              <div>
                <p>Sau khi đặt hàng, nhân viên của chúng tôi sẽ liên hệ với bạn qua Zalo để hướng dẫn chi tiết và xác nhận đơn hàng.</p>
                <p>Thông tin tài khoản sẽ được cung cấp sau khi hoàn tất thanh toán.</p>
              </div>
            }
            type="info"
            showIcon
            icon={<WhatsAppOutlined />}
            style={{ marginBottom: '20px' }}
          />
          
          <Card title="Thông tin khách hàng" className="order-info-card">
            <p><strong>Họ tên:</strong> {form.getFieldValue('name')}</p>
            <p><strong>Số điện thoại:</strong> {form.getFieldValue('phone')}</p>
            <p><strong>Email:</strong> {form.getFieldValue('email')}</p>
            <p><strong>Địa chỉ:</strong> {form.getFieldValue('address')}</p>
            <p><strong>Ghi chú:</strong> {form.getFieldValue('notes') || 'Không có'}</p>
          </Card>
        </>
      ),
    },
    {
      title: 'Hoàn tất',
      icon: <CheckCircleOutlined />,
      content: (
        <div className="order-complete">
          <div className="order-success-icon">
            <CheckCircleOutlined />
          </div>
          <Title level={3}>Đặt hàng thành công!</Title>
          <Text>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.</Text>
          
          <div className="order-info">
            <Alert
              message="Thông tin đơn hàng"
              description={
                <div>
                  <p><strong>Mã đơn hàng:</strong> {orderId}</p>
                  <p><strong>Ngày đặt:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
                  <p><strong>Tổng tiền:</strong> {formatCurrency(calculateTotal())}</p>
                </div>
              }
              type="success"
              showIcon
            />
          </div>
          
          <div className="next-steps">
            <Title level={5}>Các bước tiếp theo</Title>
            <ul>
              <li>Chúng tôi sẽ liên hệ với bạn qua Zalo trong thời gian sớm nhất để xác nhận đơn hàng.</li>
              <li>Vui lòng giữ liên lạc và kiểm tra tin nhắn Zalo thường xuyên.</li>
              <li>Thông tin tài khoản sẽ được cung cấp sau khi hoàn tất thanh toán.</li>
            </ul>
          </div>
          
          <div className="action-buttons">
            <Space>
              <Button type="primary" onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
              {/* <Button onClick={() => navigate('/orders')}>Xem đơn hàng của tôi</Button> */}
            </Space>
          </div>
        </div>
      )
    },
  ];

  const renderOrderSummary = () => (
    <Card title="Thông tin đơn hàng" className="order-summary">
      <div className="order-items">
        {cart.map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-name">
              <Text strong>{item.name}</Text>
              <Text type="secondary"> x{item.quantity}</Text>
            </div>
            <div className="item-price">
              {formatCurrency(parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      
      <Divider />
      
      <div className="order-total">
        <div className="total-label">
          <Text strong>Tổng cộng</Text>
        </div>
        <div className="total-amount">
          <Text strong>{formatCurrency(calculateTotal())}</Text>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/cart')}
          className="back-button"
        >
          Quay lại giỏ hàng
        </Button>
        <Title level={2}>Thanh toán</Title>
      </div>
      
      <div className="checkout-steps">
        <Steps current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
      </div>
      
      <div className="checkout-content">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card className="step-content">
              {steps[currentStep].content}
              
              {currentStep < steps.length - 1 && (
                <div className="steps-action">
                  {currentStep > 0 && (
                    <Button style={{ margin: '0 8px 0 0' }} onClick={prev}>
                      Quay lại
                    </Button>
                  )}
                  {currentStep === 0 && (
                    <Button type="primary" onClick={next}>
                      Tiếp tục
                    </Button>
                  )}
                  {currentStep === 1 && (
                    <Button 
                      type="primary" 
                      onClick={() => {
                        console.log('Đang nhấn nút đặt hàng...');
                        console.log('Dữ liệu form đã lưu:', formValues);
                        handleOrderConfirm();
                      }}
                      loading={loading}
                      size="large"
                      style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                    >
                      <span style={{ fontSize: '16px' }}>Đặt hàng ngay</span>
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            {renderOrderSummary()}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckoutPage; 