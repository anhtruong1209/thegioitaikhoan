import React from 'react';
import { Typography, Card, Row, Col, Input, Tag, Space, Divider, Button } from 'antd';
import { 
  AppstoreOutlined, 
  SearchOutlined, 
  RobotOutlined, 
  PictureOutlined, 
  FileTextOutlined,
  TranslationOutlined,
  AudioOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const ToolsPage = () => {
  // Danh sách các danh mục công cụ AI
  const categories = [
    { name: 'Trò chuyện và văn bản', icon: <RobotOutlined />, color: '#6a11cb' },
    { name: 'Hình ảnh', icon: <PictureOutlined />, color: '#2575fc' },
    { name: 'Âm thanh và giọng nói', icon: <AudioOutlined />, color: '#fc5c7d' },
    { name: 'Biên dịch và ngôn ngữ', icon: <TranslationOutlined />, color: '#1a1a2e' },
    { name: 'Tài liệu và PDF', icon: <FileTextOutlined />, color: '#0ca678' },
  ];

  // Danh sách các công cụ phổ biến
  const popularTools = [
    {
      name: 'ChatGPT',
      description: 'Trò chuyện với AI tiên tiến để nhận trợ giúp, trả lời câu hỏi và nhiều hơn nữa.',
      category: 'Trò chuyện và văn bản',
      tags: ['Chat AI', 'Văn bản', 'Free & Premium'],
      url: 'https://chat.openai.com/'
    },
    {
      name: 'Midjourney',
      description: 'Tạo hình ảnh nghệ thuật từ mô tả văn bản với chi tiết và thẩm mỹ cao.',
      category: 'Hình ảnh',
      tags: ['Tạo hình ảnh', 'AI Art', 'Premium'],
      url: 'https://www.midjourney.com/'
    },
    {
      name: 'Google Translate',
      description: 'Dịch văn bản và trang web giữa hơn 100 ngôn ngữ khác nhau.',
      category: 'Biên dịch và ngôn ngữ',
      tags: ['Dịch thuật', 'Miễn phí'],
      url: 'https://translate.google.com/'
    },
    {
      name: 'Otter.ai',
      description: 'Chuyển đổi giọng nói thành văn bản với độ chính xác cao.',
      category: 'Âm thanh và giọng nói',
      tags: ['Phiên âm', 'Ghi chú', 'Free & Premium'],
      url: 'https://otter.ai/'
    },
    {
      name: 'Claude',
      description: 'Trợ lý AI thông minh từ Anthropic với khả năng xử lý văn bản và phân tích tài liệu.',
      category: 'Trò chuyện và văn bản',
      tags: ['Chat AI', 'Phân tích văn bản', 'Free & Premium'],
      url: 'https://claude.ai/'
    }
  ];

  const onSearch = (value) => {
    console.log('Tìm kiếm:', value);
    // Xử lý tìm kiếm (sẽ triển khai sau)
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <AppstoreOutlined style={{ marginRight: '12px', color: '#6a11cb' }} /> 
        Các công cụ AI
      </Title>
      
      <Paragraph style={{ fontSize: '16px', marginBottom: '30px' }}>
        Khám phá bộ sưu tập các công cụ AI tốt nhất được phân loại theo danh mục. Tìm kiếm công cụ phù hợp với nhu cầu của bạn và khám phá những khả năng mới.
      </Paragraph>

      {/* Thanh tìm kiếm */}
      <Card style={{ marginBottom: '30px' }}>
        <Search
          placeholder="Tìm kiếm công cụ AI..."
          allowClear
          enterButton={<><SearchOutlined /> Tìm kiếm</>}
          size="large"
          onSearch={onSearch}
        />
      </Card>

      {/* Danh mục */}
      <Title level={4} style={{ marginTop: '30px', marginBottom: '20px' }}>
        Danh mục
      </Title>
      
      <Row gutter={[16, 16]}>
        {categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card 
              hoverable 
              style={{ textAlign: 'center', height: '100%' }}
              onClick={() => console.log(`Chọn danh mục: ${category.name}`)}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ 
                  fontSize: '36px', 
                  color: category.color,
                  background: `rgba(${parseInt(category.color.slice(1, 3), 16)}, ${parseInt(category.color.slice(3, 5), 16)}, ${parseInt(category.color.slice(5, 7), 16)}, 0.1)`,
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  {category.icon}
                </div>
                <Text strong style={{ fontSize: '18px' }}>{category.name}</Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Công cụ nổi bật */}
      <Title level={4} style={{ marginTop: '40px', marginBottom: '20px' }}>
        Công cụ AI phổ biến
      </Title>
      
      <Row gutter={[16, 16]}>
        {popularTools.map((tool, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card 
              hoverable 
              title={
                <Space>
                  <Text strong style={{ fontSize: '16px' }}>{tool.name}</Text>
                </Space>
              }
              extra={<a href={tool.url} target="_blank" rel="noopener noreferrer">Truy cập</a>}
              style={{ height: '100%' }}
            >
              <Paragraph>{tool.description}</Paragraph>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Text type="secondary" style={{ fontSize: '13px' }}>Danh mục: {tool.category}</Text>
                <div style={{ marginTop: '8px' }}>
                  {tool.tags.map((tag, i) => (
                    <Tag key={i} color="blue" style={{ marginBottom: '5px' }}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Nút xem thêm */}
      <div style={{ textAlign: 'center', margin: '40px 0 20px' }}>
        <a href="#more">
          <Button type="primary" size="large">
            Xem thêm công cụ AI
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ToolsPage; 