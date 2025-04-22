import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Row, Col, Card, Typography, Empty, Spin, Tag, Space } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { getAllServices } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tìm kiếm dịch vụ khi searchTerm thay đổi
  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  // Hàm thực hiện tìm kiếm
  const performSearch = async (term) => {
    try {
      setLoading(true);
      
      // Giả lập delay của API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Lấy tất cả dịch vụ và lọc theo từ khóa
      const allServices = getAllServices();
      const searchResults = term 
        ? allServices.filter(service => 
            service.name.toLowerCase().includes(term.toLowerCase()) ||
            service.shortDescription.toLowerCase().includes(term.toLowerCase()) ||
            service.description.toLowerCase().includes(term.toLowerCase())
          )
        : [];
      
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching services:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi người dùng tìm kiếm
  const handleSearch = (value) => {
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <div className="search-results-container" style={{ padding: '20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Search
            placeholder="Tìm kiếm dịch vụ..."
            enterButton={<SearchOutlined />}
            size="large"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>

        {searchTerm && (
          <Title level={3} style={{ marginBottom: '24px' }}>
            Kết quả tìm kiếm cho "{searchTerm}"
          </Title>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: '16px' }}>Đang tìm kiếm...</Paragraph>
          </div>
        ) : results.length === 0 ? (
          <Empty
            description={searchTerm ? `Không tìm thấy kết quả nào cho "${searchTerm}"` : 'Vui lòng nhập từ khóa để tìm kiếm'}
            style={{ margin: '40px 0' }}
          />
        ) : (
          <Row gutter={[16, 16]}>
            {results.map(service => (
              <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
                <Link to={`/service/${service.id}`} style={{ textDecoration: 'none' }}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={service.name}
                        src={service.image}
                        style={{ height: '160px', objectFit: 'contain', padding: '12px' }}
                      />
                    }
                    actions={[
                      <span key="price">{formatCurrency(service.price)}</span>,
                      <ShoppingCartOutlined key="cart" />
                    ]}
                  >
                    <Card.Meta
                      title={service.name}
                      description={service.shortDescription}
                    />
                    <div style={{ marginTop: '12px' }}>
                      <Tag color="blue">{service.category}</Tag>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default SearchResults; 