import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Space, 
  Card, 
  Avatar, 
  Spin, 
  Divider,
  Row,
  Col,
  Alert,
  Switch,
  Tooltip,
  Layout,
  Menu,
  Tag,
  Radio,
  message
} from 'antd';
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined, 
  SettingOutlined, 
  DeleteOutlined, 
  SaveOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GoogleOutlined,
  FireOutlined,
  BulbOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import CustomKnowledgeManager from '../components/CustomKnowledgeManager';
import { generateContent, getAIModels } from '../services/apiService';
// import ReactMarkdown from 'react-markdown';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Header, Sider, Content } = Layout;

// Cấu hình Marked để xử lý markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false
});

// Dữ liệu mặc định khi chưa tải được từ API
const DEFAULT_AI_MODELS = [
  {
    id: '1',
    name: 'Gemini Flash',
    description: 'Google Gemini 2.0 Flash - Nhanh và hiệu quả',
    icon: <GoogleOutlined />,
    color: '#4285F4',
    defaultSystemPrompt: "Bạn là trợ lý AI của AI MAGIC, được thiết kế để cung cấp thông tin hữu ích và chính xác. Hãy trả lời ngắn gọn, rõ ràng và luôn bằng tiếng Việt. Khi được hỏi về lĩnh vực AI, hãy ưu tiên giới thiệu các công cụ AI hiện có trên trang web AI MAGIC."
  },
  {
    id: '2',
    name: 'Gemini Pro',
    description: 'Google Gemini 2.0 Pro - Mạnh mẽ và toàn diện',
    icon: <FireOutlined />,
    color: '#EA4335',
    defaultSystemPrompt: "Bạn là trợ lý AI cao cấp của AI MAGIC, được thiết kế để cung cấp thông tin chuyên sâu và chi tiết. Hãy trả lời đầy đủ và toàn diện bằng tiếng Việt."
  }
];

// Hàm trả về icon component dựa trên tên icon
const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'GoogleOutlined':
      return <GoogleOutlined />;
    case 'FireOutlined':
      return <FireOutlined />;
    case 'BulbOutlined':
      return <BulbOutlined />;
    case 'ExperimentOutlined':
      return <ExperimentOutlined />;
    default:
      return <RobotOutlined />;
  }
};

const ChatPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useHistory, setUseHistory] = useState(true);
  const [aiModels, setAiModels] = useState(DEFAULT_AI_MODELS);
  const [selectedModel, setSelectedModel] = useState(null);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [chatSessions, setChatSessions] = useState({});
  const [customKnowledge, setCustomKnowledge] = useState([]);
  const [useCustomKnowledge, setUseCustomKnowledge] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  
  const messagesEndRef = useRef(null);

  // Tải danh sách AI models từ API
  useEffect(() => {
    const loadAIModels = async () => {
      try {
        setLoadingModels(true);
        const models = await getAIModels();
        
        if (models && models.length > 0) {
          // Chuyển đổi dữ liệu từ API sang định dạng cần thiết
          const formattedModels = models.map(model => ({
            id: model.id.toString(),
            name: model.name,
            description: model.description,
            icon: getIconComponent(model.icon || 'RobotOutlined'),
            color: model.color || '#1890ff',
            defaultSystemPrompt: model.defaultSystemPrompt || "Bạn là trợ lý AI."
          }));
          
          setAiModels(formattedModels);
          
          // Nếu chưa có model được chọn, chọn model đầu tiên
          if (!selectedModel) {
            setSelectedModel(formattedModels[0]);
            setSystemPrompt(formattedModels[0].defaultSystemPrompt);
          }
        } else {
          // Không nhận được models từ API, sử dụng dữ liệu mặc định
          console.info("Không nhận được AI models từ API, sử dụng models mặc định");
          
          // Kiểm tra nếu không có model được chọn thì gán model mặc định
          if (!selectedModel) {
            setSelectedModel(DEFAULT_AI_MODELS[0]);
            setSystemPrompt(DEFAULT_AI_MODELS[0].defaultSystemPrompt);
          }
        }
      } catch (error) {
        console.error("Không thể tải danh sách AI models:", error);
        message.error("Không thể tải danh sách AI models. Đang sử dụng dữ liệu mặc định.");
        
        // Sử dụng dữ liệu mặc định nếu API gặp lỗi
        if (!selectedModel) {
          setSelectedModel(DEFAULT_AI_MODELS[0]);
          setSystemPrompt(DEFAULT_AI_MODELS[0].defaultSystemPrompt);
        }
      } finally {
        setLoadingModels(false);
      }
    };
    
    loadAIModels();
  }, []);

  // Kiểm tra ngay khi component mount nếu chưa có model nào được chọn
  useEffect(() => {
    if (!selectedModel && aiModels.length > 0) {
      setSelectedModel(aiModels[0]);
      setSystemPrompt(aiModels[0].defaultSystemPrompt);
    } else if (!selectedModel && DEFAULT_AI_MODELS.length > 0) {
      setSelectedModel(DEFAULT_AI_MODELS[0]);
      setSystemPrompt(DEFAULT_AI_MODELS[0].defaultSystemPrompt);
    }
  }, []);

  // Tải lịch sử tin nhắn từ localStorage khi khởi động
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    const savedSelectedModel = localStorage.getItem('selectedModel');
    
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        setChatSessions(sessions);
        
        // Nếu có session cho model đã chọn, load tin nhắn
        if (savedSelectedModel && aiModels.length > 0) {
          const modelId = savedSelectedModel;
          const foundModel = aiModels.find(m => m.id === modelId);
          
          if (foundModel) {
            setSelectedModel(foundModel);
            
            if (sessions[modelId]) {
              setMessages(sessions[modelId].messages || []);
              setSystemPrompt(sessions[modelId].systemPrompt || foundModel.defaultSystemPrompt);
            } else {
              setSystemPrompt(foundModel.defaultSystemPrompt);
            }
          }
        }
      } catch (e) {
        console.error("Không thể đọc lịch sử tin nhắn:", e);
      }
    }
  }, [aiModels]);

  // Lưu tin nhắn vào localStorage khi có thay đổi
  useEffect(() => {
    if (selectedModel && messages) {
      const updatedSessions = {
        ...chatSessions,
        [selectedModel.id]: {
          messages: messages,
          systemPrompt: systemPrompt
        }
      };
      
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    }
  }, [messages, systemPrompt, selectedModel]);

  // Lưu model đã chọn
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem('selectedModel', selectedModel.id);
    }
  }, [selectedModel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSystemPromptChange = (e) => {
    setSystemPrompt(e.target.value);
  };

  const handleUseHistoryChange = useCallback((checked) => {
    setUseHistory(checked);
  }, []);

  const handleModelChange = (modelId) => {
    const newModel = aiModels.find(m => m.id === modelId);
    if (newModel && newModel.id !== selectedModel?.id) {
      setSelectedModel(newModel);
      
      // Tải tin nhắn của model này nếu có
      if (chatSessions[modelId]) {
        setMessages(chatSessions[modelId].messages || []);
        setSystemPrompt(chatSessions[modelId].systemPrompt || newModel.defaultSystemPrompt);
      } else {
        // Tạo mới session nếu chưa có
        setMessages([]);
        setSystemPrompt(newModel.defaultSystemPrompt);
      }
    }
  };

  const clearChat = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử chat với AI này?')) {
      setMessages([]);
      
      // Cập nhật session
      if (selectedModel) {
        const updatedSessions = {
          ...chatSessions,
          [selectedModel.id]: {
            messages: [],
            systemPrompt: systemPrompt
          }
        };
        
        setChatSessions(updatedSessions);
        localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      }
    }
  };

  const resetSystemPrompt = () => {
    if (selectedModel) {
      setSystemPrompt(selectedModel.defaultSystemPrompt);
    }
  };

  // Chuẩn bị kiến thức tùy chỉnh để đưa vào prompt
  const prepareCustomKnowledgePrompt = () => {
    if (!useCustomKnowledge || !customKnowledge || customKnowledge.length === 0) {
      return "";
    }
    
    let knowledgePrompt = "Tôi sẽ cung cấp một số tài liệu và thông tin quan trọng. " +
                         "Hãy sử dụng những thông tin này để trả lời câu hỏi của tôi. " +
                         "Thông tin được cung cấp từ nguồn đáng tin cậy và chính xác.\n\n";
    
    customKnowledge.forEach((item, index) => {
      knowledgePrompt += `[Tài liệu ${index + 1}: ${item.title}]\n${item.content}\n\n`;
    });
    
    knowledgePrompt += "Khi trả lời, hãy ưu tiên sử dụng thông tin từ các tài liệu này nếu câu hỏi của tôi liên quan. " +
                       "Nếu không có thông tin liên quan trong tài liệu, hãy trả lời dựa trên kiến thức chung của bạn.";
    
    return knowledgePrompt;
  };

  // Sử dụng useCallback để tránh tạo hàm mới mỗi khi component re-render
  const handleKnowledgeChange = useCallback((knowledge) => {
    setCustomKnowledge(knowledge || []);
  }, []);

  const handleUseCustomKnowledgeChange = useCallback((checked) => {
    setUseCustomKnowledge(checked);
  }, []);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Thêm tin nhắn người dùng vào danh sách
    const userMessage = { 
      type: 'user', 
      content: inputValue.trim(),
      timestamp: new Date().toISOString() 
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    
    try {
      // Chuẩn bị nội dung tin nhắn kèm theo lịch sử nếu cần
      const contents = [];
      
      // Tạo system prompt kết hợp với kiến thức tùy chỉnh
      let finalSystemPrompt = systemPrompt;
      const customKnowledgePrompt = prepareCustomKnowledgePrompt();

      if (customKnowledgePrompt) {
        finalSystemPrompt = `${finalSystemPrompt}\n\n${customKnowledgePrompt}`;
      }
      
      // Thêm system prompt nếu có
      if (finalSystemPrompt) {
        contents.push({
          role: "user",
          parts: [{ text: finalSystemPrompt }]
        });
        
        // Thêm phản hồi giả từ AI để hoàn thiện khung chat
        contents.push({
          role: "model",
          parts: [{ text: "Tôi đã hiểu yêu cầu của bạn." }]
        });
      }
      
      // Thêm lịch sử tin nhắn nếu cần
      if (useHistory && messages.length > 0) {
        // Giới hạn lịch sử (để tránh vượt quá giới hạn token)
        const historyToInclude = messages.slice(-10); // Chỉ lấy 10 tin nhắn gần nhất
        
        historyToInclude.forEach(msg => {
          if (msg.type === 'user') {
            contents.push({
              role: "user",
              parts: [{ text: msg.content }]
            });
          } else if (msg.type === 'ai') {
            contents.push({
              role: "model",
              parts: [{ text: msg.content }]
            });
          }
        });
      }
      
      // Thêm tin nhắn hiện tại vào cuối
      contents.push({
        role: "user",
        parts: [{ text: userMessage.content }]
      });
      
      // Cấu hình an toàn
      const safetySettings = [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ];
      
      // Cấu hình tạo nội dung
      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      };
      
      // Gọi API thông qua backend thay vì trực tiếp
      const response = await generateContent(
        selectedModel.id,
        contents,
        safetySettings,
        generationConfig
      );
      
      // Xử lý phản hồi từ API
      const aiResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không thể trả lời câu hỏi này.";
      
      const aiMessage = {
        type: 'ai',
        content: aiResponse,
        model: selectedModel.name,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      
    } catch (error) {
      console.error('Error calling AI API:', error);
      setError(`Lỗi khi gọi API: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Chuyển đổi markdown thành HTML và làm sạch nó
  const renderMessageContent = (content) => {
    const rawHTML = marked(content);
    const cleanHTML = DOMPurify.sanitize(rawHTML);
    return { __html: cleanHTML };
  };

  const renderSidebar = () => (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        overflow: 'auto',
      }}
      trigger={null}
    >
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {!collapsed && <Title level={4} style={{ margin: 0 }}>AI Models</Title>}
        <Button 
          type="text" 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      
      <div style={{ padding: '16px' }}>
        {loadingModels ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin size="small" />
            <Text style={{ display: 'block', marginTop: '8px' }}>Đang tải...</Text>
          </div>
        ) : (
          <div className="model-radio-container">
            <Radio.Group 
              value={selectedModel?.id} 
              onChange={handleModelChange} 
              buttonStyle="solid"
              style={{ marginBottom: 24 }}
              disabled={loadingModels || isLoading}
            >
              {aiModels.map(model => (
                <Radio.Button 
                  key={model.id} 
                  value={model.id} 
                  style={{ 
                    margin: '0 8px 8px 0',
                    borderColor: model.id === selectedModel?.id ? model.color : undefined,
                    color: model.id === selectedModel?.id ? model.color : undefined
                  }}
                >
                  <span style={{ marginRight: 8 }}>{model.icon}</span>
                  {model.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
      
      {!collapsed && (
        <>
          <Divider style={{ margin: '0 16px 16px' }} />
          
          <div style={{ padding: '0 16px 16px' }}>
            <Title level={5} style={{ marginBottom: '8px' }}>Tài liệu tùy chỉnh</Title>
            
            <div style={{ marginBottom: '16px' }}>
              <Space align="center">
                <Switch 
                  checked={useCustomKnowledge} 
                  onChange={handleUseCustomKnowledgeChange}
                />
                <Text>Sử dụng tài liệu cá nhân</Text>
              </Space>
            </div>
            
            <CustomKnowledgeManager
              onKnowledgeChange={handleKnowledgeChange}
              isActive={useCustomKnowledge}
            />
          </div>
          
          <Divider style={{ margin: '0 16px 16px' }} />
          
          <div style={{ padding: '0 16px 16px' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
              Lịch sử tin nhắn cho mỗi AI model được lưu tự động và riêng biệt.
            </Text>
            
            <Button 
              block 
              type="default" 
              icon={<DeleteOutlined />} 
              onClick={clearChat}
              style={{ marginTop: '8px' }}
              disabled={messages.length === 0}
            >
              Xóa lịch sử hiện tại
            </Button>
          </div>
        </>
      )}
    </Sider>
  );

  // Hàm để lấy nội dung welcome message tương ứng với model đã chọn
  const getWelcomeContent = () => {
    if (!selectedModel) {
      return (
        <div className="welcome-content">
          <div className="model-icon-large" style={{ backgroundColor: '#f0f0f0' }}>
            <RobotOutlined />
          </div>
          <h2>AI Model</h2>
          <p>Chào mừng bạn đến với trợ lý AI thông minh</p>
        </div>
      );
    }
    
    return (
      <div className="welcome-content">
        <div className="model-icon-large" style={{ backgroundColor: `${selectedModel.color || '#1890ff'}20` }}>
          {selectedModel.icon || <RobotOutlined />}
        </div>
        <h2>{selectedModel.name || 'AI Model'}</h2>
        <p>{selectedModel.welcomeMessage || 'Chào mừng bạn đến với trợ lý AI thông minh'}</p>
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: 'calc(100vh - 180px)', height: 'calc(100vh - 180px)' }}>
      {renderSidebar()}
      
      <Layout style={{ background: '#fff' }}>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff', 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          {loadingModels || !selectedModel ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Spin size="small" style={{ marginRight: '12px' }} />
              <div>
                <Title level={4} style={{ margin: 0 }}>Đang tải...</Title>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                fontSize: '24px', 
                color: selectedModel?.color || '#1890ff',
                marginRight: '12px'
              }}>
                {selectedModel?.icon || <RobotOutlined />}
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{selectedModel?.name || 'AI Model'}</Title>
                <Text type="secondary" style={{ fontSize: '12px' }}>{selectedModel?.description || 'AI Assistant'}</Text>
              </div>
            </div>
          )}
          
          <Space>
            {useCustomKnowledge && customKnowledge.length > 0 && (
              <Tag color="blue" icon={<RobotOutlined />} style={{ padding: '4px 8px' }}>
                Đang sử dụng {customKnowledge.length} tài liệu riêng
              </Tag>
            )}
            <Tooltip title="Cài đặt">
              <Button 
                type={showSettings ? "primary" : "default"} 
                icon={<SettingOutlined />} 
                onClick={() => setShowSettings(!showSettings)}
              />
            </Tooltip>
          </Space>
        </Header>
        
        <Content style={{ 
          padding: '16px', 
          height: 'calc(100vh - 244px)', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {showSettings && (
            <Card style={{ marginBottom: '16px', width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>Hướng dẫn hệ thống (System Prompt)</Text>
                    <Tooltip title="Khôi phục giá trị mặc định">
                      <Button 
                        size="small" 
                        type="text" 
                        icon={<SaveOutlined />} 
                        onClick={resetSystemPrompt}
                      >
                        Khôi phục mặc định
                      </Button>
                    </Tooltip>
                  </div>
                  <TextArea
                    value={systemPrompt}
                    onChange={handleSystemPromptChange}
                    rows={3}
                    placeholder="Nhập hướng dẫn cho AI..."
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                  <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                    Hướng dẫn giúp định hình cách AI phản hồi. Thay đổi để điều chỉnh phong cách và nội dung.
                  </Text>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <Switch checked={useHistory} onChange={handleUseHistoryChange} />
                  <Text style={{ marginLeft: '8px' }}>Sử dụng lịch sử trò chuyện (cá nhân hóa phản hồi AI)</Text>
                </div>
              </Space>
            </Card>
          )}
          
          <Card 
            style={{ 
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              height: showSettings ? 'calc(100% - 180px)' : '100%'
            }}
            bodyStyle={{ 
              padding: '12px', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                flex: '1 1 auto',
                overflowY: 'auto',
                overflowX: 'hidden',
                wordBreak: 'break-word',
                paddingRight: '4px',
                height: 'calc(100% - 80px)',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="chat-messages-container"
            >
              {messages.length === 0 ? getWelcomeContent() : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        marginBottom: '16px',
                        flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Avatar
                        icon={message.type === 'user' ? <UserOutlined /> : (selectedModel?.icon || <RobotOutlined />)}
                        style={{
                          backgroundColor: message.type === 'user' ? '#6a11cb' : (selectedModel?.color || '#1890ff'),
                          marginLeft: message.type === 'user' ? '12px' : '0',
                          marginRight: message.type === 'user' ? '0' : '12px',
                          flexShrink: 0
                        }}
                      />
                      <div
                        style={{
                          maxWidth: 'calc(100% - 60px)',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          backgroundColor: message.type === 'user' 
                            ? 'rgba(106, 17, 203, 0.1)' 
                            : (selectedModel ? `${selectedModel.color || '#1890ff'}10` : '#1890ff10'),
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word'
                        }}
                      >
                        <div 
                          className="message-content"
                          dangerouslySetInnerHTML={renderMessageContent(message.content)}
                          style={{ maxWidth: '100%', overflowX: 'auto' }}
                        />
                        <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </Text>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {error && (
                <Alert 
                  message="Lỗi" 
                  description={error}
                  type="error" 
                  showIcon 
                  style={{ marginTop: '10px' }}
                />
              )}
              {isLoading && (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <Spin size="large" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div style={{ flexShrink: 0 }}>
              <Space.Compact style={{ width: '100%' }}>
                <TextArea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn của bạn..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  disabled={isLoading}
                  style={{ borderRadius: '8px 0 0 8px' }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={sendMessage}
                  loading={isLoading}
                  style={{ 
                    height: 'auto',
                    borderRadius: '0 8px 8px 0',
                    background: selectedModel?.color || '#1890ff'
                  }}
                  disabled={!inputValue.trim() || isLoading || !selectedModel}
                >
                  Gửi
                </Button>
              </Space.Compact>
              <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '10px', fontSize: '12px' }}>
                Powered by Google Gemini {useCustomKnowledge && customKnowledge.length > 0 ? '+ Kiến thức tùy chỉnh' : ''}
              </Text>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage; 