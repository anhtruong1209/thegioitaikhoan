import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import ToolCard from './ToolCard';

const { Title, Paragraph } = Typography;

const CategorySection = ({ category }) => {
  return (
    <div className="category-section" id={category.category.toLowerCase().replace(/\s+/g, '-')}>
      <Divider orientation="left">
        <Title level={2}>{category.category}</Title>
      </Divider>
      <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
        {category.description}
      </Paragraph>
      <Row gutter={[24, 24]}>
        {category.tools.map(tool => (
          <Col xs={24} sm={12} md={8} lg={6} key={tool.id}>
            <ToolCard tool={tool} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategorySection; 