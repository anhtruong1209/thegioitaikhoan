import React, { useState } from 'react';
import { Typography, Row, Col, Card, Form, Input, Button, Space, message, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, SendOutlined, CloudOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values) => {
    setSubmitting(true);
    
    // Giả lập gửi form
    setTimeout(() => {
      message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
      form.resetFields();
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <Row gutter={[24, 48]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={1} style={{ fontWeight: 700, marginBottom: 16 }}>
            Liên Hệ Với Chúng Tôi
          </Title>
          <Paragraph style={{ fontSize: '16px', maxWidth: '800px', margin: '0 auto' }}>
            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ mua tài khoản lưu trữ đám mây
          </Paragraph>
        </Col>

        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={10}>
              <Card 
                style={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
                  margin: '-24px -24px 24px',
                  padding: '40px 24px',
                  borderRadius: '12px 12px 0 0',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <CloudOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                  <Title level={3} style={{ color: 'white', margin: '0' }}>
                    Thế Giới Tài Khoản
                  </Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', margin: '8px 0 0' }}>
                    Dịch vụ tài khoản lưu trữ đám mây uy tín
                  </Paragraph>
                </div>

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Space align="start">
                      <PhoneOutlined style={{ fontSize: '24px', color: '#6a11cb' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}>Hotline</div>
                        <a href="tel:0832206397" style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>
                          0832206397
                        </a>
                      </div>
                    </Space>
                  </div>

                  <div>
                    <Space align="start">
                      <MailOutlined style={{ fontSize: '24px', color: '#6a11cb' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}>Email</div>
                        <a href="mailto:support@shoptaikhoan.vn" style={{ color: '#1890ff' }}>
                          support@shoptaikhoan.vn
                        </a>
                      </div>
                    </Space>
                  </div>

                  <div>
                    <Space align="start">
                      <HomeOutlined style={{ fontSize: '24px', color: '#6a11cb' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '16px' }}>Địa chỉ</div>
                        <div>Hà Nội, Việt Nam</div>
                      </div>
                    </Space>
                  </div>
                </Space>

                <Divider />

                <div style={{ marginTop: '24px' }}>
                  <Title level={4}>Giờ làm việc</Title>
                  <Paragraph>
                    <ul style={{ paddingLeft: '20px' }}>
                      <li>Thứ 2 - Thứ 6: 8h00 - 18h00</li>
                      <li>Thứ 7: 8h00 - 12h00</li>
                      <li>Chủ nhật: Nghỉ</li>
                    </ul>
                  </Paragraph>
                  <Paragraph style={{ fontStyle: 'italic' }}>
                    * Hỗ trợ kỹ thuật làm việc 24/7 qua hotline
                  </Paragraph>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={14}>
              <Card 
                title="Gửi yêu cầu tư vấn" 
                style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                      >
                        <Input size="large" placeholder="Nhập họ tên của bạn" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                      >
                        <Input size="large" placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { type: 'email', message: 'Email không hợp lệ!' },
                      { required: true, message: 'Vui lòng nhập email!' }
                    ]}
                  >
                    <Input size="large" placeholder="Nhập địa chỉ email" />
                  </Form.Item>

                  <Form.Item
                    name="package"
                    label="Gói dịch vụ quan tâm"
                  >
                    <Input size="large" placeholder="Ví dụ: Gói 10TB" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Nội dung"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                  >
                    <TextArea
                      placeholder="Nhập nội dung cần tư vấn"
                      rows={5}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={submitting}
                      icon={<SendOutlined />}
                      style={{ 
                        height: '46px', 
                        padding: '0 32px',
                        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                        border: 'none',
                      }}
                    >
                      Gửi yêu cầu
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContactPage; 