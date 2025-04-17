import React from 'react';
import { Typography, Card, Tabs, Divider, Row, Col, Space, Button, Table, Tag, Alert, Steps } from 'antd';
import { 
  RobotOutlined, 
  ApiOutlined, 
  CodeOutlined, 
  CloudOutlined,
  MessageOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  LockOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text, Link } = Typography;
const { TabPane } = Tabs;

const AIIntegrationPage = () => {
  // Dữ liệu về các dịch vụ AI API
  const aiServices = [
    {
      name: 'OpenAI API',
      description: 'API cho các mô hình như GPT-4 và nhiều mô hình AI tiên tiến khác.',
      features: ['Chat completions', 'Image generation', 'Text embeddings'],
      difficulty: 'Trung bình',
      url: 'https://openai.com/api/'
    },
    {
      name: 'Google AI/Gemini API',
      description: 'Bộ API của Google cho phép sử dụng các mô hình Gemini và các công cụ AI khác của Google.',
      features: ['Text generation', 'Image analysis', 'Multimodal', 'Code generation'],
      difficulty: 'Trung bình',
      url: 'https://ai.google.dev/'
    },
    {
      name: 'Hugging Face Inference API',
      description: 'Truy cập hàng nghìn mô hình mã nguồn mở qua API đơn giản.',
      features: ['Text generation', 'Image recognition', 'Mô hình mã nguồn mở'],
      difficulty: 'Dễ đến Trung bình',
      url: 'https://huggingface.co/inference-api'
    },
    {
      name: 'Anthropic Claude API',
      description: 'API để tích hợp Claude, một AI assistant an toàn và hữu ích.',
      features: ['Chat completions', 'Text analysis', 'Content generation'],
      difficulty: 'Trung bình',
      url: 'https://www.anthropic.com/api'
    }
  ];

  // Mã mẫu cho việc tích hợp OpenAI API
  const openaiSampleCode = `
// Cài đặt thư viện
// npm install openai

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hàm gọi API
async function callChatGPT(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Lỗi khi gọi OpenAI API:', error);
    return null;
  }
}

// Sử dụng trong React component
function AIComponent() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleAskAI = async () => {
    setLoading(true);
    const response = await callChatGPT('Hãy cho tôi một bài thơ ngắn về Việt Nam');
    setResult(response);
    setLoading(false);
  };
  
  return (
    <div>
      <Button onClick={handleAskAI} loading={loading}>Hỏi AI</Button>
      <div>{result}</div>
    </div>
  );
}
  `;

  // Mã mẫu cho ChatWidget
  const chatWidgetCode = `
// Tạo thành phần Chat Widget đơn giản

import React, { useState } from 'react';
import { Input, Button, Card, Typography, Space, Avatar } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import './ChatWidget.css';

const { Text } = Typography;

function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Thêm tin nhắn người dùng
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    // Gọi API - thay thế bằng API thực tế của bạn
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      // Thêm phản hồi từ AI
      setMessages(prev => [...prev, { 
        text: data.message, 
        sender: 'ai' 
      }]);
    } catch (error) {
      console.error('Lỗi:', error);
      setMessages(prev => [...prev, { 
        text: 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.', 
        sender: 'ai' 
      }]);
    }
    
    setLoading(false);
  };

  return (
    <Card title="AI Assistant" style={{ width: 300, position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <div className="chat-messages" style={{ height: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index} className={\`message \${msg.sender}\`} style={{ 
            display: 'flex', 
            marginBottom: 10,
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' 
          }}>
            {msg.sender === 'ai' && (
              <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#6a11cb', marginRight: 8 }} />
            )}
            <div style={{ 
              background: msg.sender === 'user' ? '#2575fc' : '#f0f0f0',
              color: msg.sender === 'user' ? 'white' : 'black',
              padding: '8px 12px',
              borderRadius: 8,
              maxWidth: '70%'
            }}>
              <Text style={{ color: msg.sender === 'user' ? 'white' : 'black' }}>{msg.text}</Text>
            </div>
            {msg.sender === 'user' && (
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#2575fc', marginLeft: 8 }} />
            )}
          </div>
        ))}
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          placeholder="Nhập tin nhắn..." 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleSend}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} loading={loading} />
      </Space.Compact>
    </Card>
  );
}

export default ChatWidget;
  `;

  return (
    <div>
      <Title level={2} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <RobotOutlined style={{ marginRight: '12px', color: '#6a11cb' }} /> 
        Tích hợp AI vào trang web của bạn
      </Title>
      
      <Paragraph style={{ fontSize: '16px', marginBottom: '30px' }}>
        Có nhiều cách để tích hợp AI vào trang web của bạn, từ việc sử dụng các API có sẵn đến việc triển khai các giải pháp tùy chỉnh. Trang này sẽ giới thiệu các phương pháp phổ biến nhất và cách triển khai chúng.
      </Paragraph>

      <Tabs defaultActiveKey="1" style={{ marginBottom: '30px' }}>
        <TabPane tab={<span><ApiOutlined /> API Services</span>} key="1">
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Paragraph>
                Cách phổ biến nhất để tích hợp AI vào trang web là sử dụng API từ các nhà cung cấp dịch vụ AI. Bạn chỉ cần gửi yêu cầu đến API và hiển thị kết quả trên trang web của mình.
              </Paragraph>
              
              <Table 
                dataSource={aiServices} 
                rowKey="name"
                pagination={false}
                columns={[
                  {
                    title: 'Dịch vụ',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, record) => (
                      <a href={record.url} target="_blank" rel="noopener noreferrer">{text}</a>
                    )
                  },
                  {
                    title: 'Mô tả',
                    dataIndex: 'description',
                    key: 'description',
                  },
                  {
                    title: 'Tính năng',
                    dataIndex: 'features',
                    key: 'features',
                    render: tags => (
                      <>
                        {tags.map(tag => (
                          <Tag color="blue" key={tag}>
                            {tag}
                          </Tag>
                        ))}
                      </>
                    ),
                  },
                  {
                    title: 'Độ khó',
                    dataIndex: 'difficulty',
                    key: 'difficulty',
                  },
                ]}
              />
              
              <Divider orientation="left">Mã mẫu - Tích hợp OpenAI API</Divider>
              
              <Card style={{ marginTop: 16, background: '#f6f8fa' }}>
                <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
                  <code>{openaiSampleCode}</code>
                </pre>
              </Card>
              
              <Alert
                message="Lưu ý về API Key"
                description="Luôn đảm bảo bạn không tiết lộ API key trực tiếp trong mã frontend. Sử dụng server-side hoặc API proxy để giữ an toàn cho các khóa xác thực của bạn."
                type="warning"
                showIcon
                style={{ marginTop: 24 }}
              />
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={<span><MessageOutlined /> Chatbot tích hợp</span>} key="2">
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Paragraph>
                Chatbot AI là một cách tuyệt vời để cung cấp hỗ trợ tương tác trên trang web của bạn. Có nhiều cách để tích hợp chatbot:
              </Paragraph>
              
              <Card title="Các lựa chọn tích hợp Chatbot" style={{ marginBottom: 20 }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card title="Giải pháp có sẵn" style={{ height: '100%' }}>
                      <ul>
                        <li>Intercom</li>
                        <li>Zendesk</li>
                        <li>Drift</li>
                        <li>Chatbase</li>
                        <li>Botpress</li>
                      </ul>
                      <Paragraph type="secondary">
                        Ưu điểm: Dễ tích hợp, không cần phát triển nhiều
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Widget tùy chỉnh" style={{ height: '100%' }}>
                      <Paragraph>
                        Phát triển widget chat của riêng bạn và tích hợp với API AI như OpenAI, Google AI hoặc Claude.
                      </Paragraph>
                      <Paragraph type="secondary">
                        Ưu điểm: Kiểm soát hoàn toàn UI/UX và tính năng
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Iframe/Script Embedding" style={{ height: '100%' }}>
                      <Paragraph>
                        Nhúng một giải pháp chat bên ngoài thông qua iframe hoặc script.
                      </Paragraph>
                      <Paragraph type="secondary">
                        Ưu điểm: Cân bằng giữa tính tùy chỉnh và sự đơn giản
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </Card>
              
              <Divider orientation="left">Mã mẫu - Tạo Chat Widget</Divider>
              
              <Card style={{ marginTop: 16, background: '#f6f8fa' }}>
                <pre style={{ overflow: 'auto', maxHeight: '400px' }}>
                  <code>{chatWidgetCode}</code>
                </pre>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={<span><ThunderboltOutlined /> AI trên trình duyệt</span>} key="3">
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Paragraph>
                Với sự tiến bộ của JavaScript và WebAssembly, bạn có thể chạy các mô hình AI nhẹ trực tiếp trên trình duyệt người dùng mà không cần gửi dữ liệu về máy chủ.
              </Paragraph>
              
              <Card title="Các thư viện AI cho trình duyệt" style={{ marginBottom: 20 }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card 
                      title="TensorFlow.js" 
                      extra={<a href="https://www.tensorflow.org/js" target="_blank">Trang chủ</a>}
                      style={{ height: '100%' }}
                    >
                      <Paragraph>
                        Thư viện JavaScript cho phép bạn chạy các mô hình máy học trên trình duyệt hoặc Node.js.
                      </Paragraph>
                      <Paragraph type="secondary">
                        Tính năng: Xử lý hình ảnh, phân loại, phát hiện đối tượng
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card 
                      title="ONNX Runtime" 
                      extra={<a href="https://onnxruntime.ai/" target="_blank">Trang chủ</a>}
                      style={{ height: '100%' }}
                    >
                      <Paragraph>
                        Chạy các mô hình ONNX trên trình duyệt với WebAssembly và WebGL.
                      </Paragraph>
                      <Paragraph type="secondary">
                        Tính năng: Tương thích với nhiều framework ML
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card 
                      title="Transformers.js" 
                      extra={<a href="https://huggingface.co/docs/transformers.js" target="_blank">Trang chủ</a>}
                      style={{ height: '100%' }}
                    >
                      <Paragraph>
                        Thư viện để chạy các mô hình Transformer như BERT, GPT-2 trên trình duyệt.
                      </Paragraph>
                      <Paragraph type="secondary">
                        Tính năng: NLP, sinh văn bản, phân loại
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </Card>
              
              <Alert
                message="Ưu và nhược điểm của AI trên trình duyệt"
                description={
                  <Row gutter={16}>
                    <Col span={12}>
                      <Title level={5}>Ưu điểm</Title>
                      <ul>
                        <li>Riêng tư - dữ liệu không rời khỏi thiết bị người dùng</li>
                        <li>Giảm chi phí máy chủ</li>
                        <li>Hoạt động offline</li>
                        <li>Độ trễ thấp (không cần giao tiếp mạng)</li>
                      </ul>
                    </Col>
                    <Col span={12}>
                      <Title level={5}>Nhược điểm</Title>
                      <ul>
                        <li>Giới hạn về kích thước và phức tạp của mô hình</li>
                        <li>Tiêu thụ tài nguyên của thiết bị người dùng</li>
                        <li>Thời gian tải ban đầu có thể dài</li>
                        <li>Trải nghiệm khác nhau trên các thiết bị khác nhau</li>
                      </ul>
                    </Col>
                  </Row>
                }
                type="info"
                showIcon
                style={{ marginTop: 24 }}
              />
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={<span><GlobalOutlined /> Nền tảng AI as a Service</span>} key="4">
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Paragraph>
                Nếu bạn không muốn phát triển tất cả từ đầu, bạn có thể sử dụng các nền tảng AI as a Service cho phép bạn tích hợp AI vào website mà không cần nhiều kiến thức kỹ thuật.
              </Paragraph>
              
              <Card title="Nền tảng AI as a Service phổ biến" style={{ marginBottom: 20 }}>
                <Table 
                  dataSource={[
                    {
                      name: 'Dialogflow (Google)',
                      description: 'Nền tảng xây dựng chatbot và trợ lý ảo với NLU mạnh mẽ.',
                      useCase: 'Chatbot, voice assistants',
                      integration: 'JavaScript, REST API, Mobile SDKs'
                    },
                    {
                      name: 'ChatGPT Plugin Builder',
                      description: 'Tạo và tích hợp plugin ChatGPT vào trang web của bạn.',
                      useCase: 'Tích hợp AI assistant',
                      integration: 'API, plugin system'
                    },
                    {
                      name: 'Botpress',
                      description: 'Nền tảng chatbot mã nguồn mở với nhiều tùy chỉnh và tích hợp AI.',
                      useCase: 'Chatbot, agent tương tác',
                      integration: 'JavaScript, API'
                    },
                    {
                      name: 'MakeswithAI',
                      description: 'Nền tảng no-code để tạo các ứng dụng AI.',
                      useCase: 'Các ứng dụng AI đa dạng',
                      integration: 'Embeds, API'
                    }
                  ]} 
                  columns={[
                    {
                      title: 'Nền tảng',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Mô tả',
                      dataIndex: 'description',
                      key: 'description',
                    },
                    {
                      title: 'Trường hợp sử dụng',
                      dataIndex: 'useCase',
                      key: 'useCase',
                    },
                    {
                      title: 'Phương thức tích hợp',
                      dataIndex: 'integration',
                      key: 'integration',
                    }
                  ]}
                  pagination={false}
                />
              </Card>
              
              <Divider />
              
              <Title level={4}>Các bước tích hợp chung</Title>
              <Steps 
                direction="vertical" 
                current={0}
                items={[
                  { 
                    title: 'Xác định nhu cầu AI',
                    description: 'Xác định rõ bạn muốn AI giải quyết vấn đề gì trên trang web.'
                  },
                  { 
                    title: 'Chọn giải pháp phù hợp',
                    description: 'Dựa trên nhu cầu, ngân sách và kiến thức kỹ thuật, chọn API, SDK hoặc nền tảng phù hợp.'
                  },
                  { 
                    title: 'Lập kế hoạch tích hợp',
                    description: 'Thiết kế cách AI sẽ tương tác với người dùng và tích hợp vào UI hiện tại.'
                  },
                  { 
                    title: 'Phát triển và kiểm thử',
                    description: 'Triển khai giải pháp, kiểm thử kỹ lưỡng trước khi đưa vào sản phẩm thực tế.'
                  },
                  { 
                    title: 'Theo dõi và cải thiện',
                    description: 'Thu thập phản hồi người dùng và dữ liệu sử dụng để liên tục cải thiện trải nghiệm AI.'
                  }
                ]}
              />
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab={<span><LockOutlined /> Bảo mật & Quyền riêng tư</span>} key="5">
          <Alert
            message="Lưu ý quan trọng về việc tích hợp AI"
            description={
              <div>
                <Paragraph>
                  Khi tích hợp AI vào trang web của bạn, cần lưu ý những vấn đề bảo mật và quyền riêng tư sau:
                </Paragraph>
                <ul>
                  <li><strong>Bảo vệ API key</strong> - Không bao giờ lưu trữ API key trực tiếp trong mã frontend.</li>
                  <li><strong>Xử lý dữ liệu người dùng</strong> - Thông báo rõ ràng về việc sử dụng và lưu trữ dữ liệu.</li>
                  <li><strong>Vấn đề quyền riêng tư</strong> - Cân nhắc sử dụng AI on-device nếu dữ liệu nhạy cảm.</li>
                  <li><strong>Tuân thủ quy định</strong> - Đảm bảo việc sử dụng AI tuân thủ GDPR, CCPA và các quy định khác.</li>
                  <li><strong>Kiểm soát nội dung</strong> - Triển khai các biện pháp để ngăn chặn nội dung có hại.</li>
                </ul>
              </div>
            }
            type="warning"
            showIcon
          />
          
          <Card title="Các biện pháp bảo mật tốt nhất" style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Bảo vệ API Key">
                  <Paragraph>
                    Sử dụng proxy server hoặc serverless function để gọi API AI thay vì gọi trực tiếp từ frontend.
                  </Paragraph>
                  <Paragraph type="secondary">
                    Ví dụ: Sử dụng Next.js API Routes, Netlify Functions, AWS Lambda.
                  </Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Xác thực và Phân quyền">
                  <Paragraph>
                    Triển khai xác thực người dùng để kiểm soát ai có thể truy cập vào các tính năng AI của bạn.
                  </Paragraph>
                  <Paragraph type="secondary">
                    Giúp giảm lạm dụng và kiểm soát chi phí API.
                  </Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Rate Limiting">
                  <Paragraph>
                    Giới hạn số lượng yêu cầu mà một người dùng có thể thực hiện trong một khoảng thời gian.
                  </Paragraph>
                  <Paragraph type="secondary">
                    Bảo vệ khỏi chi phí bất ngờ và lạm dụng dịch vụ.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>

      <Divider />
      
      <Card style={{ backgroundColor: '#f0f4ff', marginTop: '30px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={16}>
            <Title level={4}>Bạn muốn tích hợp AI vào trang web của mình?</Title>
            <Paragraph>
              Chúng tôi có thể giúp bạn tích hợp các giải pháp AI vào trang web của bạn. Từ việc cài đặt chatbot AI đến phát triển các ứng dụng AI tùy chỉnh, đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn trong toàn bộ quá trình.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Space direction="vertical">
              <Button type="primary" size="large" icon={<MessageOutlined />}>
                Liên hệ tư vấn
              </Button>
              <Button type="link">Xem dịch vụ của chúng tôi</Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AIIntegrationPage; 