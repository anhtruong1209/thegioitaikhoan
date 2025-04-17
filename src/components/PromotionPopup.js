import React, { useState, useEffect } from 'react';
import { Modal, Button, Typography, Space, Image, Tag, Row, Col, Checkbox, Divider } from 'antd';
import { ShoppingCartOutlined, FireOutlined, ClockCircleOutlined, SendOutlined, CloseOutlined, GiftOutlined } from '@ant-design/icons';
import '../styles/PromotionPopup.css';

const { Title, Text, Paragraph } = Typography;

// ID phiên bản popup hiện tại - thay đổi giá trị này khi muốn hiển thị lại popup cho tất cả người dùng
const POPUP_VERSION = '2024-06-01';

// Cấu hình thời gian hiển thị popup (milliseconds)
const POPUP_DELAY = 1000; // 1 giây

// Sử dụng biến toàn cục để theo dõi xem popup đã được hiển thị trong phiên làm việc này chưa
// Điều này đảm bảo ngay cả khi component được gắn nhiều lần, popup chỉ hiển thị một lần
window.popupShownInSession = window.popupShownInSession || false;

const PromotionPopup = () => {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5); // 5 phút countdown
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Nếu popup đã hiển thị trong phiên này, không hiển thị lại
    if (window.popupShownInSession) {
      return;
    }

    // Kiểm tra xem người dùng đã chọn không hiển thị phiên bản này chưa
    const savedPopupVersion = localStorage.getItem('popupVersion');
    const neverShowPopup = localStorage.getItem('neverShowPromoPopup') === 'true';
    
    // Nếu phiên bản đã thay đổi, reset trạng thái "không hiển thị lại"
    if (savedPopupVersion !== POPUP_VERSION) {
      localStorage.setItem('popupVersion', POPUP_VERSION);
      localStorage.removeItem('neverShowPromoPopup');
    }
    
    // Hiển thị popup nếu người dùng chưa chọn không hiển thị lại
    // hoặc nếu đã có phiên bản mới
    if (!neverShowPopup || savedPopupVersion !== POPUP_VERSION) {
      // Hiển thị popup sau khoảng thời gian đã cấu hình
      const timer = setTimeout(() => {
        setVisible(true);
        window.popupShownInSession = true; // Đánh dấu popup đã hiển thị
      }, POPUP_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Effect cho countdown
  useEffect(() => {
    if (visible && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 60000); // Giảm 1 phút mỗi lần
      
      return () => clearInterval(interval);
    }
  }, [visible, countdown]);

  const handleClose = () => {
    setVisible(false);
    
    // Lưu tùy chọn "Không hiển thị lại" nếu người dùng đã chọn
    if (dontShowAgain) {
      localStorage.setItem('neverShowPromoPopup', 'true');
      localStorage.setItem('popupVersion', POPUP_VERSION);
    }
  };

  const handleBuyNow = () => {
    // Chuyển hướng đến trang mua hàng
    window.open('https://aimagic.vn/san-pham', '_blank');
    setVisible(false);
    
    // Lưu tùy chọn "Không hiển thị lại" nếu người dùng đã chọn
    if (dontShowAgain) {
      localStorage.setItem('neverShowPromoPopup', 'true');
      localStorage.setItem('popupVersion', POPUP_VERSION);
    }
  };

  const handleCheckboxChange = (e) => {
    setDontShowAgain(e.target.checked);
  };

  // Function để reset trạng thái popup (có thể gọi từ bên ngoài)
  const resetPopup = () => {
    window.popupShownInSession = false;
    localStorage.removeItem('neverShowPromoPopup');
    localStorage.removeItem('popupVersion');
  };

  // Gắn function reset vào window để có thể gọi từ console cho mục đích gỡ lỗi
  if (typeof window !== 'undefined') {
    window.resetPromoPopup = resetPopup;
  }

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      className="promotion-popup"
      closeIcon={<CloseOutlined style={{ color: 'white' }} />}
    >
      <div className="popup-header" style={{ 
        background: 'linear-gradient(135deg, #1c11ec, #1890ff)', 
        margin: '-24px -24px 20px -24px',
        padding: '16px 24px',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        color: 'white'
      }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>
          <GiftOutlined style={{ marginRight: '8px' }} /> Ưu đãi đặc biệt
        </Title>
      </div>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Image
            src="https://st1.techlusive.in/wp-content/uploads/2023/08/GoogleDrive.jpg"
            alt="Sản phẩm AI"
            style={{border: '1px solid#1c11ec', borderRadius: '8px', width: '100%' }}
            preview={false}
          />
          <Tag color="red" style={{ marginTop: 10 }}>
            <FireOutlined /> Giảm giá lên đến 50%
          </Tag>
        </Col>
        <Col xs={24} md={12}>
          <Title level={3} style={{ color: '#1890ff', marginTop: 0 }}>
            30TB Tài khoản Google Drive
          </Title>
          <Tag color="gold" style={{ marginBottom: 16 }}>
            <ClockCircleOutlined /> Còn {countdown} phút
          </Tag>
          <Paragraph>
            Nâng cấp dung lượng lưu trữ của bạn lên đến 30TB, sử dụng miễn phí Gemini Pro, NotebookLM và các tính năng mới nhất của Google.
          </Paragraph>
          
          <div style={{ marginTop: 20 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Title level={2} style={{ margin: 0, color: '#f5222d' }}>
                  VNĐ ?00.000
                </Title>
              </div>
              <Button 
                type="primary" 
                size="large" 
                icon={<SendOutlined />} 
                onClick={handleBuyNow}
                style={{ background: '#f5222d', borderColor: '#f5222d' }}
                className="pulse-btn"
              >
                Liên hệ ngay
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      
      <Divider style={{ margin: '16px 0 8px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Checkbox checked={dontShowAgain} onChange={handleCheckboxChange}>
          Không hiển thị lại
        </Checkbox>
      </div>
    </Modal>
  );
};

export default PromotionPopup;
 