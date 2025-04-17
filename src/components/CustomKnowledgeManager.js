import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  List, 
  Typography, 
  Space, 
  Divider, 
  Modal, 
  Form,
  Tag,
  Tooltip,
  Empty,
  message,
  Spin
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  EditOutlined, 
  FileTextOutlined,
  InfoCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { 
  getUserKnowledge, 
  createKnowledge, 
  updateKnowledge, 
  deleteKnowledge,
  getCurrentUserId
} from '../services/apiService';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const CustomKnowledgeManager = ({ onKnowledgeChange, isActive }) => {
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Lấy userId của người dùng hiện tại
  const userId = parseInt(getCurrentUserId());

  // Tải dữ liệu từ API khi component được mount hoặc userId thay đổi
  useEffect(() => {
    if (!userId) {
      return; // Không làm gì nếu không có userId
    }
    
    const fetchKnowledge = async () => {
      try {
        setLoading(true);
        const data = await getUserKnowledge(userId);
        setKnowledgeBase(data || []);
      } catch (error) {
        console.error("Không thể tải dữ liệu kiến thức tùy chỉnh:", error);
        message.error("Không thể tải dữ liệu kiến thức tùy chỉnh. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledge();
  }, [userId]);
  
  // Effect để xử lý callback khi knowledgeBase hoặc isActive thay đổi
  useEffect(() => {
    if (onKnowledgeChange) {
      onKnowledgeChange(isActive ? knowledgeBase : null);
    }
  }, [isActive, knowledgeBase, onKnowledgeChange]);

  const showModal = (item = null) => {
    setEditingItem(item);
    form.resetFields();
    
    if (item) {
      form.setFieldsValue({
        title: item.title,
        content: item.content,
      });
    }
    
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (editingItem) {
        // Cập nhật item đã tồn tại
        const updatedItem = await updateKnowledge(editingItem.id, {
          title: values.title,
          content: values.content
        });
        
        setKnowledgeBase(prev => 
          prev.map(item => 
            item.id === editingItem.id ? updatedItem : item
          )
        );
        message.success('Đã cập nhật tài liệu thành công!');
      } else {
        // Thêm item mới
        const newItem = await createKnowledge(userId, {
          title: values.title,
          content: values.content,
          userId: userId
        });
        
        setKnowledgeBase(prev => [...prev, newItem]);
        message.success('Đã thêm tài liệu mới thành công!');
      }
    } catch (error) {
      console.error("Lỗi khi lưu tài liệu:", error);
      message.error("Không thể lưu tài liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
      setEditingItem(null);
    }
  };

  const deleteItem = async (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa tài liệu này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await deleteKnowledge(id);
          setKnowledgeBase(prev => prev.filter(item => item.id !== id));
          message.success('Đã xóa tài liệu thành công!');
        } catch (error) {
          console.error("Lỗi khi xóa tài liệu:", error);
          message.error("Không thể xóa tài liệu. Vui lòng thử lại sau.");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Làm mới dữ liệu từ server
  const refreshData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await getUserKnowledge(userId);
      setKnowledgeBase(data || []);
      message.success('Đã tải lại dữ liệu thành công!');
    } catch (error) {
      console.error("Không thể tải dữ liệu kiến thức tùy chỉnh:", error);
      message.error("Không thể tải lại dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          icon={<SyncOutlined />} 
          size="small"
          onClick={refreshData}
          disabled={!isActive || loading}
        >
          Làm mới
        </Button>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          size="small"
          disabled={!isActive || loading || !userId}
        >
          Thêm tài liệu
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin />
        </div>
      ) : knowledgeBase.length === 0 ? (
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={!userId ? "Vui lòng đăng nhập để sử dụng tính năng này" : "Chưa có tài liệu nào"} 
          style={{ margin: '16px 0' }}
        />
      ) : (
        <List
          size="small"
          dataSource={knowledgeBase}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Button 
                  icon={<EditOutlined />} 
                  type="text" 
                  size="small"
                  disabled={!isActive}
                  onClick={() => showModal(item)}
                />,
                <Button 
                  icon={<DeleteOutlined />} 
                  type="text" 
                  danger
                  size="small"
                  disabled={!isActive}
                  onClick={() => deleteItem(item.id)}
                />
              ]}
              style={{ 
                padding: '8px 0',
                opacity: isActive ? 1 : 0.5
              }}
            >
              <List.Item.Meta
                title={
                  <Text ellipsis style={{ maxWidth: '100%' }}>
                    {item.title}
                  </Text>
                }
                description={
                  <Text type="secondary" ellipsis={{ rows: 1 }}>
                    {item.content.substring(0, 50)}
                    {item.content.length > 50 ? '...' : ''}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}

      <Modal
        title={editingItem ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input placeholder="Nhập tiêu đề tài liệu (ví dụ: Quy định về thủ tục hành chính)" />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <TextArea 
              rows={10} 
              placeholder="Nhập nội dung tài liệu, văn bản, quy định, hướng dẫn hoặc thông tin bạn muốn AI sử dụng để trả lời"
            />
          </Form.Item>
          
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingItem ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomKnowledgeManager; 