import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ToolCard = ({ tool }) => {
  return (
    <Card
      hoverable
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
      cover={
        <div style={{ height: 180, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', padding: '20px' }}>
          <img
            alt={tool.name}
            src={tool.image}
            style={{ maxHeight: '120px', maxWidth: '80%', objectFit: 'contain' }}
          />
        </div>
      }
      onClick={() => window.open(tool.link, '_blank')}
    >
      <Title level={4} style={{ marginTop: 0 }}>{tool.name}</Title>
      <Paragraph style={{ flex: 1 }}>{tool.description}</Paragraph>
    </Card>
  );
};

export default ToolCard; 