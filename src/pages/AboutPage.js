import React from 'react';
import { Typography, Row, Col, Card, Space, Divider } from 'antd';
import { CloudOutlined, CheckCircleOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div className="about-page">
      <Row gutter={[24, 48]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={1} style={{ fontWeight: 700, marginBottom: 16 }}>
            Về Thế Giới Tài Khoản
          </Title>
          <Paragraph style={{ fontSize: '16px', maxWidth: '800px', margin: '0 auto' }}>
            Chúng tôi là đơn vị cung cấp tài khoản lưu trữ đám mây uy tín, giá rẻ với dung lượng lớn và cam kết sử dụng lâu dài.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Card 
            style={{ 
              borderRadius: '12px', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              padding: '24px'
            }}
          >
            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <Title level={3}>Sứ mệnh của chúng tôi</Title>
                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Thế Giới Tài Khoản ra đời với mục đích cung cấp các giải pháp lưu trữ đám mây chất lượng cao với chi phí hợp lý cho cả cá nhân và doanh nghiệp.
                </Paragraph>
                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Với nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin và đối tác chiến lược là các nhà cung cấp cloud hàng đầu, chúng tôi tự tin mang đến các dịch vụ ổn định, an toàn và tiết kiệm chi phí cho khách hàng.
                </Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <div style={{ 
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
                  borderRadius: '10px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '48px 24px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <CloudOutlined style={{ fontSize: '72px', marginBottom: '24px' }} />
                  <Title level={2} style={{ color: 'white', margin: 0 }}>DUNG LƯỢNG LỚN</Title>
                  <Title level={2} style={{ color: 'white', margin: '8px 0' }}>GIÁ SIÊU ƯU ĐÃI</Title>
                  <Title level={3} style={{ color: 'white', fontWeight: 'normal', margin: '16px 0 0' }}>
                    Từ 2TB đến 30TB
                  </Title>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            Tại sao khách hàng chọn chúng tôi?
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Card 
                style={{ 
                  height: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  padding: '16px'
                }}
              >
                <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={4}>Cam kết chất lượng</Title>
                <Paragraph style={{ fontSize: '15px' }}>
                  Chúng tôi cam kết cung cấp tài khoản chính chủ, hoạt động ổn định và có thời hạn sử dụng lâu dài.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                style={{ 
                  height: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  padding: '16px'
                }}
              >
                <SafetyOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={4}>An toàn & bảo mật</Title>
                <Paragraph style={{ fontSize: '15px' }}>
                  Thông tin khách hàng được bảo mật tuyệt đối, tài khoản được bảo vệ và hướng dẫn sử dụng an toàn.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                style={{ 
                  height: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  padding: '16px'
                }}
              >
                <TeamOutlined style={{ fontSize: '48px', color: '#6a11cb', marginBottom: '16px' }} />
                <Title level={4}>Hỗ trợ nhiệt tình</Title>
                <Paragraph style={{ fontSize: '15px' }}>
                  Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng giải đáp thắc mắc và hỗ trợ khách hàng 24/7.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24} style={{ textAlign: 'center' }}>
          <Divider />
          <Title level={2}>Sẵn sàng nâng cấp dung lượng lưu trữ?</Title>
          <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
            Liên hệ ngay với chúng tôi để được tư vấn và hỗ trợ đặt hàng
          </Paragraph>
          <div style={{ margin: '16px 0', fontSize: '24px', fontWeight: 'bold' }}>
            <a href="tel:0832206397" style={{ color: '#6a11cb' }}>Hotline: 0832206397</a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutPage; 