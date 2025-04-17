import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Button, 
  Space, 
  Divider, 
  Radio, 
  Menu,
  Tabs,
  Badge
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GoogleOutlined,
  FireOutlined,
  RobotOutlined,
  DeleteOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import CustomKnowledgeManager from './CustomKnowledgeManager';

const { Title, Text } = Typography;
const { Sider } = Layout;
const { TabPane } = Tabs;

const ChatSidebar = ({ 
  collapsed, 
  setCollapsed,
  selectedModel,
  aiModels,
  handleModelChange,
  clearChat,
  messagesEmpty,
  customKnowledge,
  setCustomKnowledge,
  useCustomKnowledge,
  setUseCustomKnowledge
}) => {
  
  const handleKnowledgeChange = (isActive) => {
    setUseCustomKnowledge(isActive);
  };

  const handleKnowledgeBaseChange = (knowledgeBase) => {
    setCustomKnowledge(knowledgeBase);
  };
  
  return (
    <Sider
      width={280}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        overflow: 'hidden',
      }}
      trigger={null}
    >
      <div style={{ 
        padding: '20px 16px', 
        borderBottom: '1px solid #f0f0f0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {!collapsed && <Title level={4} style={{ margin: 0 }}>AI Chat</Title>}
        <Button 
          type="text" 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      
      {!collapsed && (
        <Tabs 
          defaultActiveKey="models" 
          style={{ 
            height: 'calc(100% - 64px)',
            overflow: 'hidden'
          }}
        >
          <TabPane 
            tab={
              <span>
                <RobotOutlined />
                AI Models
              </span>
            } 
            key="models"
          >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
              <Radio.Group 
                onChange={(e) => handleModelChange(e.target.value)} 
                value={selectedModel.id}
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {aiModels.map(model => (
                    <Radio 
                      key={model.id} 
                      value={model.id}
                      style={{ 
                        display: 'flex',
                        padding: '10px',
                        borderRadius: '6px',
                        border: selectedModel.id === model.id ? `1px solid ${model.color}` : '1px solid transparent',
                        background: selectedModel.id === model.id ? `${model.color}10` : 'transparent',
                        marginRight: 0
                      }}
                    >
                      <Space align="start">
                        <div style={{ 
                          fontSize: '18px', 
                          color: model.color,
                          marginRight: '8px',
                          marginTop: '2px'
                        }}>
                          {model.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{model.name}</div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>{model.description}</Text>
                        </div>
                      </Space>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
              
              <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                <Divider style={{ margin: '12px 0' }} />
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                  Lịch sử tin nhắn cho mỗi AI model được lưu tự động và riêng biệt.
                </Text>
                
                <Button 
                  block 
                  type="default" 
                  icon={<DeleteOutlined />} 
                  onClick={clearChat}
                  style={{ marginTop: '8px' }}
                  disabled={messagesEmpty}
                >
                  Xóa lịch sử hiện tại
                </Button>
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <Badge dot={useCustomKnowledge}>
                  <DatabaseOutlined />
                  Dữ liệu riêng
                </Badge>
              </span>
            } 
            key="knowledge"
          >
            <div style={{ height: 'calc(100% - 16px)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
              <CustomKnowledgeManager 
                onKnowledgeChange={handleKnowledgeChange}
                isActive={useCustomKnowledge}
                setCustomKnowledge={setCustomKnowledge}
              />
            </div>
          </TabPane>
        </Tabs>
      )}
    </Sider>
  );
};

export default ChatSidebar; 