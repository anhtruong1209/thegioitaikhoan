import React from 'react';
import { Typography, Card, Steps, Divider, Row, Col, List, Space, Button } from 'antd';
import { 
  ReadOutlined, 
  ToolOutlined, 
  CheckCircleOutlined, 
  InfoCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  CodeOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const GuidesPage = () => {
  // Danh sách các hướng dẫn cơ bản
  const basicGuides = [
    {
      title: 'Tìm kiếm công cụ AI',
      description: 'Cách tìm công cụ AI phù hợp với nhu cầu của bạn trên nền tảng của chúng tôi.',
      icon: <SearchOutlined />,
      url: '/guides/search'
    },
    {
      title: 'Sử dụng công cụ AI hiệu quả',
      description: 'Các mẹo và lời khuyên để tận dụng tối đa các công cụ AI.',
      icon: <ToolOutlined />,
      url: '/guides/effective-use'
    },
    {
      title: 'Bắt đầu với AI cơ bản',
      description: 'Hướng dẫn cơ bản cho người mới bắt đầu với trí tuệ nhân tạo.',
      icon: <RocketOutlined />,
      url: '/guides/getting-started'
    },
    {
      title: 'Các câu hỏi thường gặp',
      description: 'Giải đáp những câu hỏi phổ biến về các công cụ AI.',
      icon: <QuestionCircleOutlined />,
      url: '/guides/faq'
    }
  ];

  // Danh sách hướng dẫn nâng cao
  const advancedGuides = [
    {
      title: 'Kỹ thuật prompt nâng cao',
      description: 'Học cách viết prompt hiệu quả để nhận kết quả tốt hơn từ các mô hình AI.',
      icon: <FileTextOutlined />
    },
    {
      title: 'Tích hợp API của công cụ AI',
      description: 'Hướng dẫn về cách tích hợp API của các công cụ AI vào dự án của bạn.',
      icon: <CodeOutlined />
    },
    {
      title: 'Bảo mật khi sử dụng công cụ AI',
      description: 'Các biện pháp đảm bảo an toàn và bảo mật khi sử dụng công cụ AI.',
      icon: <SafetyOutlined />
    }
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <ReadOutlined style={{ marginRight: '12px', color: '#6a11cb' }} /> 
        Hướng dẫn sử dụng
      </Title>
      
      <Paragraph style={{ fontSize: '16px', marginBottom: '30px' }}>
        Chào mừng bạn đến với trang hướng dẫn sử dụng của AI MAGIC. Trang này sẽ giúp bạn hiểu rõ hơn về cách sử dụng các công cụ AI một cách hiệu quả.
      </Paragraph>

      <Card title={
        <Space size="middle">
          <RocketOutlined style={{ color: '#6a11cb' }} />
          <span>Bắt đầu sử dụng</span>
        </Space>
      } style={{ marginBottom: '30px' }}>
        <Steps current={0} direction="vertical">
          <Step title="Tìm kiếm công cụ phù hợp" description="Sử dụng thanh tìm kiếm hoặc duyệt qua các danh mục để tìm công cụ AI phù hợp với nhu cầu của bạn." />
          <Step title="Đọc mô tả và đánh giá" description="Xem mô tả chi tiết và đánh giá từ người dùng khác để hiểu rõ hơn về công cụ." />
          <Step title="Truy cập và sử dụng công cụ" description="Nhấp vào nút liên kết để truy cập trực tiếp vào công cụ AI đã chọn." />
          <Step title="Đánh giá trải nghiệm" description="Sau khi sử dụng, quay lại và chia sẻ đánh giá của bạn để giúp cộng đồng." />
        </Steps>
      </Card>

      <Divider orientation="left">
        <Space>
          <InfoCircleOutlined />
          <span>Hướng dẫn cơ bản</span>
        </Space>
      </Divider>
      
      <Row gutter={[24, 24]}>
        {basicGuides.map((guide, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{ height: '100%' }}
              title={
                <Space>
                  {guide.icon}
                  <Text strong>{guide.title}</Text>
                </Space>
              }
            >
              <Paragraph>{guide.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">
        <Space>
          <ToolOutlined />
          <span>Hướng dẫn nâng cao</span>
        </Space>
      </Divider>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3 }}
        dataSource={advancedGuides}
        renderItem={(item) => (
          <List.Item>
            <Card 
              hoverable
              style={{ height: '100%' }}
              title={
                <Space>
                  {item.icon}
                  <Text strong>{item.title}</Text>
                </Space>
              }
            >
              <Paragraph>{item.description}</Paragraph>
            </Card>
          </List.Item>
        )}
      />
      
      <Divider />
      
      <Card style={{ backgroundColor: '#f0f4ff', marginTop: '30px' }}>
        <Space direction="vertical" size="middle">
          <Text strong style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
            <QuestionCircleOutlined style={{ color: '#6a11cb', marginRight: '8px' }} />
            Cần thêm sự hỗ trợ?
          </Text>
          <Paragraph>
            Nếu bạn không tìm thấy thông tin cần thiết trong các hướng dẫn của chúng tôi, vui lòng liên hệ với đội ngũ hỗ trợ hoặc truy cập diễn đàn cộng đồng để được giúp đỡ.
          </Paragraph>
          <Space>
            <Button type="primary">Liên hệ hỗ trợ</Button>
            <Button>Diễn đàn cộng đồng</Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default GuidesPage; 