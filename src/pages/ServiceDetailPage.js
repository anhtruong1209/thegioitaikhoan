import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Card, Button, Divider, Tag, List, Steps, Tabs, Image, Space, Collapse, Alert } from 'antd';
import {
  CloudOutlined,
  CheckCircleOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  LaptopOutlined,
  MobileOutlined,
  DownloadOutlined,
  CreditCardOutlined,
  LockOutlined,
  PhoneOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

// Import image assets
import googleOneImage from '../assets/images/google-one.webp';
import googleDriveImage from '../assets/images/drive.png';
import adobeImage from '../assets/images/adobe-crreative-cloud-1.webp';
import microsoftImage from '../assets/images/microsoft365.png';
import canvaImage from '../assets/images/canva.jpeg';
import geminiImage from '../assets/images/gemini.webp';
import notebookImage from '../assets/images/NotebookLM-Plus.webp';

// Đường dẫn ảnh
const imagesPath = {
  'google-one': googleOneImage,
  'drive': googleDriveImage,
  'adobe': adobeImage,
  'microsoft': microsoftImage,
  'canva': canvaImage,
  'gemini': geminiImage,
  'notebook': notebookImage // sử dụng notion thay thế tạm
};

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// Dữ liệu chi tiết dịch vụ
const serviceDetails = {
  'google-one': {
    title: 'Google One',
    subtitle: 'Dịch vụ lưu trữ đám mây từ Google',
    description: 'Google One là dịch vụ đăng ký cao cấp của Google cung cấp dung lượng lưu trữ đám mây bổ sung được chia sẻ giữa Google Drive, Gmail và Google Photos, cùng với quyền truy cập vào các chuyên gia Google, các tính năng đặc quyền cho các dịch vụ khác của Google và các ưu đãi cho thành viên.',
    image: imagesPath['google-one'],
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
    pricing: [
      { name: 'Gói 2TB', price: '249,000₫', originalPrice: '350,000₫', discount: '29%' },
      { name: 'Gói 5TB', price: '349,000₫', originalPrice: '500,000₫', discount: '30%' },
      { name: 'Gói 10TB', price: '449,000₫', originalPrice: '650,000₫', discount: '31%', popular: true },
      { name: 'Gói 20TB', price: '549,000₫', originalPrice: '800,000₫', discount: '31%' },
      { name: 'Gói 30TB', price: '649,000₫', originalPrice: '950,000₫', discount: '32%' },
    ],
    features: [
      'Tài khoản chính chủ – nâng cấp trực tiếp trên Gmail của bạn',
      'Lưu trữ và sao lưu hình ảnh, video, tài liệu và nhiều hơn nữa',
      'Không gian lưu trữ được chia sẻ giữa Google Drive, Gmail và Google Photos',
      'Bảo vệ tài khoản với tính năng bảo mật nâng cao',
      'Chia sẻ dung lượng với tối đa 5 thành viên gia đình',
      'Truy cập các chuyên gia Google khi cần trợ giúp',
      'Tự động sao lưu dữ liệu thiết bị di động',
      'Hỗ trợ tận tình và bảo hành trọn đời tài khoản'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói dung lượng Google One phù hợp với nhu cầu của bạn' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Chúng tôi sẽ kích hoạt tài khoản Google One cho bạn trong vòng 24h' },
      { title: 'Sử dụng', description: 'Truy cập và sử dụng dịch vụ Google One trên tài khoản của bạn' }
    ],
    faqs: [
      {
        question: 'Google One khác gì so với Google Drive?',
        answer: 'Google One là dịch vụ đăng ký cao cấp của Google bao gồm dung lượng lưu trữ đám mây bổ sung cho Google Drive, Gmail và Google Photos, cùng với các tính năng và ưu đãi khác. Google Drive là dịch vụ lưu trữ đám mây cơ bản của Google.'
      },
      {
        question: 'Tôi có thể chia sẻ dung lượng Google One với người khác không?',
        answer: 'Có, bạn có thể chia sẻ dung lượng Google One với tối đa 5 thành viên gia đình. Mỗi thành viên vẫn có không gian riêng tư của họ và chỉ sử dụng một phần dung lượng được chia sẻ.'
      },
      {
        question: 'Tôi có cần cài đặt thêm phần mềm để sử dụng Google One không?',
        answer: 'Không, Google One hoạt động với tài khoản Google hiện có của bạn. Tuy nhiên, có ứng dụng Google One tùy chọn cho thiết bị di động cung cấp các tính năng bổ sung như sao lưu thiết bị.'
      },
      {
        question: 'Điều gì xảy ra khi hết hạn đăng ký Google One?',
        answer: 'Khi hết hạn đăng ký Google One, dung lượng lưu trữ của bạn sẽ trở về mức miễn phí 15GB. Bạn vẫn có thể truy cập tất cả tệp của mình, nhưng không thể thêm nội dung mới nếu đã vượt quá 15GB cho đến khi xóa bớt dữ liệu hoặc gia hạn đăng ký.'
      },
      {
        question: 'Làm thế nào để liên hệ với chuyên gia Google qua Google One?',
        answer: 'Thành viên Google One có thể liên hệ với chuyên gia Google thông qua ứng dụng Google One hoặc trang web Google One. Bạn có thể nhận hỗ trợ qua trò chuyện, email hoặc điện thoại tùy thuộc vào quốc gia của bạn.'
      }
    ]
  },
  'google-drive': {
    title: 'Google Drive',
    subtitle: 'Dịch vụ lưu trữ và đồng bộ hóa tập tin trực tuyến',
    description: 'Google Drive là dịch vụ lưu trữ đám mây giúp bạn lưu trữ và truy cập tập tin của mình ở mọi nơi. Drive lưu trữ an toàn ảnh, video, tập tin và nhiều hơn nữa, tất cả đều được sao lưu tự động.',
    image: imagesPath['drive'],
    color: '#0f9d58',
    gradient: 'linear-gradient(135deg, #4285f4, #0f9d58)',
    pricing: [
      { name: 'Gói 2TB', price: '249,000₫', originalPrice: '350,000₫', discount: '29%' },
      { name: 'Gói 5TB', price: '349,000₫', originalPrice: '500,000₫', discount: '30%' },
      { name: 'Gói 10TB', price: '449,000₫', originalPrice: '650,000₫', discount: '31%', popular: true },
      { name: 'Gói 20TB', price: '549,000₫', originalPrice: '800,000₫', discount: '31%' },
    ],
    features: [
      'Truy cập tập tin từ mọi thiết bị, mọi nơi',
      'Đồng bộ hóa tự động giữa máy tính, điện thoại và tablet',
      'Chia sẻ tập tin với bất kỳ ai chỉ với vài cú nhấp chuột',
      'Quản lý quyền truy cập và chia sẻ linh hoạt',
      'Tích hợp với Google Docs, Sheets và Slides',
      'Tìm kiếm thông minh với công nghệ AI',
      'Phát hiện và loại bỏ tập tin trùng lặp',
      'Sao lưu và khôi phục tự động'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói dung lượng Google Drive phù hợp với nhu cầu của bạn' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Chúng tôi sẽ kích hoạt tài khoản cho bạn trong vòng 24h' },
      { title: 'Sử dụng', description: 'Truy cập và sử dụng dịch vụ Google Drive trên tài khoản của bạn' }
    ],
    faqs: [
      {
        question: 'Google Drive có những ưu điểm gì so với các dịch vụ lưu trữ đám mây khác?',
        answer: 'Google Drive tích hợp chặt chẽ với hệ sinh thái Google, cho phép bạn tạo và chỉnh sửa tài liệu, bảng tính, bài thuyết trình trực tiếp trong trình duyệt. Drive cũng cung cấp công cụ tìm kiếm mạnh mẽ, khả năng nhận dạng văn bản trong hình ảnh và nhiều tính năng AI để tổ chức tập tin của bạn.'
      },
      {
        question: 'Tôi có thể chia sẻ tập tin Google Drive với người không có tài khoản Google không?',
        answer: 'Có, bạn có thể chia sẻ tập tin với bất kỳ ai, ngay cả khi họ không có tài khoản Google. Bạn có thể tạo liên kết chia sẻ và gửi cho họ qua email hoặc tin nhắn.'
      },
      {
        question: 'Google Drive có an toàn không?',
        answer: 'Google Drive sử dụng mã hóa cấp doanh nghiệp để bảo vệ dữ liệu của bạn khi truyền giữa thiết bị của bạn, các dịch vụ Google và các trung tâm dữ liệu. Khi lưu trữ trên ổ đĩa Google, dữ liệu của bạn được mã hóa bằng các khóa mã hóa tiên tiến.'
      },
      {
        question: 'Tôi có thể truy cập Google Drive khi không có kết nối internet không?',
        answer: 'Có, bạn có thể cài đặt ứng dụng Google Drive trên máy tính để truy cập và làm việc với tập tin ngay cả khi không có kết nối internet. Mọi thay đổi sẽ được đồng bộ hóa khi bạn kết nối lại.'
      },
      {
        question: 'Làm thế nào để tối ưu hóa việc sử dụng không gian lưu trữ trên Google Drive?',
        answer: 'Bạn có thể sử dụng công cụ "Lưu trữ" của Google Drive để xác định tập tin chiếm nhiều dung lượng, tập tin trùng lặp, và tập tin đã chia sẻ. Ngoài ra, bạn có thể lưu tập tin ở định dạng Google Docs, Sheets hoặc Slides thay vì các định dạng Office truyền thống để tiết kiệm không gian.'
      }
    ]
  },
  'adobe-creative-cloud': {
    title: 'Adobe Creative Cloud',
    subtitle: 'Bộ công cụ sáng tạo chuyên nghiệp',
    description: 'Adobe Creative Cloud là bộ ứng dụng và dịch vụ từ Adobe Inc. cung cấp cho người dùng quyền truy cập vào bộ phần mềm thiết kế đồ họa, chỉnh sửa video, thiết kế web và nhiếp ảnh, cùng với một số dịch vụ dựa trên đám mây.',
    image: imagesPath['adobe'],
    color: '#fa0f00',
    gradient: 'linear-gradient(135deg, #fa0f00, #a30c00)',
    pricing: [
      { name: 'Gói dành cho cá nhân', price: '650,000₫', originalPrice: '1,290,000₫', discount: '50%' },
      { name: 'Gói Photography', price: '380,000₫', originalPrice: '720,000₫', discount: '47%' },
      { name: 'Gói dành cho doanh nghiệp', price: '950,000₫', originalPrice: '1,990,000₫', discount: '52%', popular: true },
      { name: 'Gói Học sinh - Sinh viên', price: '350,000₫', originalPrice: '650,000₫', discount: '46%' },
    ],
    features: [
      'Truy cập toàn bộ ứng dụng sáng tạo của Adobe như Photoshop, Illustrator, InDesign, Premiere Pro...',
      'Cập nhật phiên bản mới nhất và các tính năng mới liên tục',
      '100GB dung lượng lưu trữ đám mây',
      'Hàng nghìn font chữ Adobe và phông chữ từ bộ sưu tập Adobe Fonts',
      'Công cụ tạo và quản lý danh mục sản phẩm cá nhân',
      'Chia sẻ và hợp tác dự án dễ dàng với Adobe Cloud',
      'Truy cập Adobe Stock với hơn 90 triệu nội dung chất lượng cao',
      'Hỗ trợ tích hợp AI qua Adobe Sensei'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói Adobe Creative Cloud phù hợp với nhu cầu của bạn' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Chúng tôi sẽ kích hoạt tài khoản trong vòng 24h' },
      { title: 'Sử dụng', description: 'Đăng nhập và tải các ứng dụng Creative Cloud về máy của bạn' }
    ],
    faqs: [
      {
        question: 'Adobe Creative Cloud bao gồm những ứng dụng nào?',
        answer: 'Adobe Creative Cloud bao gồm hơn 20 ứng dụng khác nhau, bao gồm Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, XD, Lightroom, Dreamweaver, Animate, và nhiều ứng dụng khác tùy thuộc vào gói đăng ký.'
      },
      {
        question: 'Tôi có thể cài đặt Adobe Creative Cloud trên bao nhiêu thiết bị?',
        answer: 'Bạn có thể cài đặt các ứng dụng Creative Cloud trên nhiều máy tính (Windows và Mac), nhưng chỉ có thể kích hoạt và sử dụng trên tối đa hai thiết bị cùng một lúc với cùng một ID Adobe.'
      },
      {
        question: 'Tôi có thể hủy đăng ký Adobe Creative Cloud bất cứ lúc nào không?',
        answer: 'Đăng ký Adobe Creative Cloud là cam kết hàng năm, nhưng bạn có thể hủy đăng ký trong vòng 14 ngày đầu tiên để được hoàn tiền đầy đủ. Sau thời gian này, việc hủy có thể dẫn đến phí chấm dứt hợp đồng sớm.'
      },
      {
        question: 'Tôi cần kết nối internet để sử dụng Adobe Creative Cloud không?',
        answer: 'Bạn cần kết nối internet để tải xuống và kích hoạt các ứng dụng Creative Cloud, và ứng dụng sẽ cần kiểm tra giấy phép định kỳ (khoảng 30 ngày một lần). Tuy nhiên, bạn không cần kết nối internet liên tục để sử dụng các ứng dụng sau khi đã cài đặt.'
      },
      {
        question: 'Có bản dùng thử của Adobe Creative Cloud không?',
        answer: 'Có, Adobe cung cấp bản dùng thử miễn phí 7 ngày cho Adobe Creative Cloud. Bạn có thể truy cập tất cả các ứng dụng và dịch vụ trong thời gian dùng thử, sau đó quyết định mua gói đăng ký phù hợp với nhu cầu của mình.'
      }
    ]
  },
  'microsoft-365': {
    title: 'Microsoft 365',
    subtitle: 'Bộ ứng dụng làm việc và cộng tác toàn diện',
    description: 'Microsoft 365 (trước đây là Office 365) là bộ dịch vụ đăng ký cung cấp các ứng dụng năng suất của Microsoft và dịch vụ đám mây. Bao gồm Word, Excel, PowerPoint, Outlook, OneDrive và nhiều ứng dụng khác để giúp bạn làm việc hiệu quả ở mọi nơi.',
    image: imagesPath['microsoft'],
    color: '#0078d4',
    gradient: 'linear-gradient(135deg, #0078d4, #4b53bc)',
    pricing: [
      { name: 'Microsoft 365', isComing: true, actionText: 'Tìm hiểu thêm', actionLink: '/service/microsoft-365' }
    ],
    features: [
      'Ứng dụng Office đầy đủ trên Windows, Mac, iOS và Android',
      '1TB dung lượng lưu trữ OneDrive mỗi người dùng',
      'Email doanh nghiệp với tên miền tùy chỉnh (gói Business)',
      'Cuộc họp và cuộc gọi trực tuyến thông qua Microsoft Teams',
      'Bảo mật tiên tiến để bảo vệ dữ liệu',
      'Cập nhật liên tục các tính năng mới nhất',
      'Hỗ trợ kỹ thuật 24/7 từ Microsoft',
      'Công cụ cộng tác thời gian thực'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói Microsoft 365 phù hợp với nhu cầu của bạn' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Chúng tôi sẽ kích hoạt tài khoản trong vòng 24h' },
      { title: 'Sử dụng', description: 'Đăng nhập và cài đặt các ứng dụng Microsoft 365 trên thiết bị của bạn' }
    ],
    faqs: [
      {
        question: 'Microsoft 365 khác gì so với Office truyền thống?',
        answer: 'Microsoft 365 là dịch vụ đăng ký hàng năm cung cấp các ứng dụng Office mới nhất cùng với dung lượng lưu trữ đám mây và các dịch vụ được cập nhật liên tục. Office truyền thống là mua đứt một lần và không có các dịch vụ đám mây hoặc cập nhật tính năng mới.'
      },
      {
        question: 'Tôi có thể chia sẻ đăng ký Microsoft 365 Family với bao nhiêu người?',
        answer: 'Microsoft 365 Family cho phép bạn chia sẻ đăng ký với tối đa 6 người trong gia đình. Mỗi người sẽ có tài khoản và không gian lưu trữ OneDrive 1TB riêng.'
      },
      {
        question: 'Microsoft 365 có những ứng dụng nào?',
        answer: 'Microsoft 365 bao gồm Word, Excel, PowerPoint, Outlook, và tùy thuộc vào gói đăng ký, có thể bao gồm Publisher, Access, Exchange, SharePoint, Teams, và các dịch vụ khác. Các ứng dụng có sẵn khác nhau giữa các gói cá nhân và doanh nghiệp.'
      },
      {
        question: 'Tôi có cần kết nối internet để sử dụng Microsoft 365 không?',
        answer: 'Bạn cần kết nối internet để cài đặt và kích hoạt Microsoft 365, và để sử dụng đầy đủ các tính năng đám mây. Tuy nhiên, các ứng dụng chính như Word, Excel và PowerPoint có thể sử dụng offline sau khi cài đặt, nhưng sẽ cần kết nối định kỳ (khoảng 30 ngày) để xác minh đăng ký.'
      },
      {
        question: 'Điều gì xảy ra nếu tôi không gia hạn Microsoft 365?',
        answer: 'Khi đăng ký hết hạn, các ứng dụng Office sẽ chuyển sang chế độ chỉ đọc với chức năng hạn chế. Bạn vẫn có thể xem và in tài liệu, nhưng không thể chỉnh sửa hoặc tạo tài liệu mới. Dữ liệu OneDrive của bạn vẫn có thể truy cập trong ít nhất 90 ngày sau khi hết hạn.'
      }
    ]
  },
  'canva-pro': {
    title: 'Canva Pro',
    subtitle: 'Nền tảng thiết kế đồ họa trực tuyến hàng đầu',
    description: 'Canva Pro mở ra khả năng thiết kế không giới hạn với hơn 100 triệu ảnh stock, video, âm thanh và template premium. Tiết kiệm thời gian và nâng cao chất lượng thiết kế của bạn với công cụ đồ họa trực tuyến mạnh mẽ nhất hiện nay.',
    image: imagesPath['canva'],
    color: '#00c4cc',
    gradient: 'linear-gradient(135deg, #7d2ae8, #00c4cc)',
    pricing: [
      { name: 'Canva Pro', isComing: true, actionText: 'Tìm hiểu thêm', actionLink: '/service/canva-pro' }
    ],
    features: [
      'Hơn 100 triệu ảnh, video, audio và graphic stock',
      'Hơn 610.000 template chuyên nghiệp',
      'Công cụ xóa phông (Background Remover)',
      'Brand Kit lưu trữ font, màu sắc và logo thương hiệu',
      'Lưu trữ không giới hạn trên đám mây',
      'Lên lịch và đăng nội dung trên mạng xã hội',
      'Magic Resize tự động điều chỉnh kích thước thiết kế',
      'Tùy chỉnh font, template và các yếu tố thương hiệu'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói Canva Pro phù hợp với nhu cầu của bạn' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán an toàn qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Kích hoạt tài khoản và truy cập đầy đủ tính năng Canva Pro' },
      { title: 'Khám phá', description: 'Bắt đầu thiết kế với kho template và tài nguyên khổng lồ' }
    ],
    faqs: [
      {
        question: 'Canva Pro khác gì so với Canva miễn phí?',
        answer: 'Canva Pro cung cấp quyền truy cập vào hơn 100 triệu ảnh, video, audio stock cao cấp, hơn 610.000 template premium, công cụ xóa phông (Background Remover), Brand Kit, lên lịch nội dung, Magic Resize và nhiều tính năng nâng cao khác không có trong phiên bản miễn phí.'
      },
      {
        question: 'Tôi có thể sử dụng các thiết kế của mình cho mục đích thương mại không?',
        answer: 'Có, với Canva Pro, bạn có thể sử dụng thiết kế của mình cho cả mục đích cá nhân và thương mại. Bạn có thể tạo nội dung cho mạng xã hội, quảng cáo, vật phẩm thương hiệu và nhiều hơn nữa.'
      },
      {
        question: 'Canva Pro có hoạt động trên thiết bị di động không?',
        answer: 'Có, Canva Pro có ứng dụng di động cho cả iOS và Android, cho phép bạn thiết kế mọi lúc, mọi nơi. Bạn cũng có thể truy cập Canva qua trình duyệt web trên máy tính.'
      },
      {
        question: 'Tôi có cần kỹ năng thiết kế để sử dụng Canva Pro không?',
        answer: 'Không, Canva được thiết kế để dễ sử dụng cho tất cả mọi người, kể cả người mới bắt đầu. Với thư viện template đa dạng và giao diện kéo-thả trực quan, bạn có thể tạo ra thiết kế chuyên nghiệp mà không cần kinh nghiệm thiết kế trước đó.'
      },
      {
        question: 'Tôi có thể hủy đăng ký Canva Pro bất cứ lúc nào không?',
        answer: 'Khi mua qua chúng tôi, bạn mua gói có thời hạn cố định (1 tháng, 1 năm). Không có cơ chế tự động gia hạn, vì vậy bạn không cần lo lắng về việc hủy đăng ký. Khi hết hạn, bạn có thể lựa chọn mua tiếp hoặc quay về phiên bản miễn phí.'
      }
    ]
  },
  'notebooklm-plus': {
    title: 'NotebookLM Plus',
    subtitle: 'Trợ lý nghiên cứu AI tiên tiến từ Google',
    description: 'NotebookLM Plus là công cụ nghiên cứu dựa trên AI được phát triển bởi Google, giúp bạn khai thác tối đa thông tin từ các tài liệu. Là một phần của gói dịch vụ Google AI Premium (bao gồm cả Gemini Advanced), NotebookLM Plus cho phép bạn tải lên tài liệu nguồn để AI giúp bạn tổ chức ý tưởng, tóm tắt nội dung, và trích xuất thông tin quan trọng.',
    image: imagesPath['notebook'],
    color: '#16a085',
    gradient: 'linear-gradient(135deg, #16a085, #2c3e50)',
    pricing: [
      { name: 'Google One AI Premium', isComing: true, actionText: 'Tìm hiểu thêm', actionLink: '/service/notebook-plus' }
    ],
    features: [
      'Truy cập đầy đủ NotebookLM Plus và Gemini Advanced',
      'Tạo tóm tắt thông minh từ các tài liệu dài và phức tạp',
      'Trích xuất ý chính và điểm quan trọng từ tài liệu đầu vào',
      'Tạo ghi chú có cấu trúc và sắp xếp thông tin một cách logic',
      'Khả năng đặt câu hỏi cho các tài liệu để tìm hiểu sâu hơn',
      'Tích hợp với Google Drive để dễ dàng truy cập các tài liệu',
      '2TB dung lượng lưu trữ Google One để lưu trữ tài liệu',
      'Ưu đãi đặc biệt cho các dịch vụ Google khác'
    ],
    steps: [
      { title: 'Chọn gói', description: 'Lựa chọn gói Google One AI Premium phù hợp với nhu cầu của bạn (hàng tháng hoặc hàng năm)' },
      { title: 'Thanh toán', description: 'Tiến hành thanh toán an toàn qua các kênh được hỗ trợ' },
      { title: 'Kích hoạt', description: 'Chúng tôi sẽ kích hoạt tài khoản trong vòng 24h và gửi thông tin đăng nhập' },
      { title: 'Sử dụng', description: 'Truy cập notebooklm.google.com và bắt đầu tải lên tài liệu để nghiên cứu' }
    ],
    faqs: [
      {
        question: 'NotebookLM Plus có liên quan gì đến Google One?',
        answer: 'NotebookLM Plus sẽ là một phần của gói dịch vụ Google One AI Premium, cung cấp quyền truy cập đến các công cụ AI cao cấp của Google bao gồm Gemini Advanced và 2TB dung lượng lưu trữ đám mây. Khi đăng ký Google One AI Premium, bạn sẽ có quyền truy cập đầy đủ vào NotebookLM Plus.'
      },
      {
        question: 'Khi nào NotebookLM Plus sẽ ra mắt tại Việt Nam?',
        answer: 'Chúng tôi đang làm việc để đưa NotebookLM Plus đến người dùng Việt Nam trong thời gian sớm nhất. Vui lòng đăng ký nhận thông báo để được cập nhật về ngày ra mắt chính thức và các ưu đãi đặc biệt cho người dùng đăng ký sớm.'
      },
      {
        question: 'NotebookLM Plus có thể xử lý những loại tài liệu nào?',
        answer: 'NotebookLM Plus có thể xử lý nhiều định dạng tài liệu khác nhau, bao gồm PDF, DOCX, TXT, và HTML. Công cụ này đặc biệt hiệu quả với tài liệu học thuật, sách giáo khoa, báo cáo nghiên cứu, bài báo khoa học, và tài liệu kinh doanh dài. Với 2TB dung lượng từ Google One, bạn có thể lưu trữ và phân tích một lượng lớn tài liệu.'
      },
      {
        question: 'Google One AI Premium bao gồm những dịch vụ nào?',
        answer: 'Google One AI Premium bao gồm Gemini Advanced (mô hình AI mạnh mẽ nhất của Google), NotebookLM Plus (công cụ nghiên cứu AI), 2TB dung lượng lưu trữ đám mây cho Google Drive, Gmail, và Google Photos, khả năng chia sẻ dung lượng với tối đa 5 thành viên gia đình, và các tính năng bảo mật nâng cao.'
      },
      {
        question: 'Làm thế nào để tôi sử dụng cả NotebookLM Plus và Google Drive cùng nhau?',
        answer: 'NotebookLM Plus tích hợp liền mạch với Google Drive. Bạn có thể lưu trữ tài liệu trong Google Drive sử dụng 2TB dung lượng từ gói Google One AI Premium, rồi truy cập và phân tích chúng trong NotebookLM Plus. Quá trình làm việc này giúp tạo ra một quy trình nghiên cứu và lưu trữ tài liệu hiệu quả.'
      }
    ]
  },
  'gemini-advanced': {
    title: 'Gemini Advanced',
    subtitle: 'Mô hình AI tiên tiến nhất từ Google',
    description: 'Gemini Advanced cung cấp quyền truy cập vào Ultra 1.0, mô hình AI mạnh mẽ nhất của Google, được thiết kế để xử lý các tác vụ phức tạp. Là một phần của gói Google One AI Premium, Gemini Advanced vượt xa khả năng của Gemini tiêu chuẩn, cung cấp khả năng suy luận nâng cao, hiểu ngữ cảnh sâu hơn, và hỗ trợ chuyên sâu cho nhiều lĩnh vực.',
    image: imagesPath['gemini'],
    color: '#8e44ad',
    gradient: 'linear-gradient(135deg, #8e44ad, #4c1d95)',
    pricing: [
      { name: 'Google One AI Premium', isComing: true, actionText: 'Tìm hiểu thêm', actionLink: '/service/gemini-advanced' }
    ],
    features: [
      'Truy cập Ultra 1.0 - mô hình AI mạnh mẽ nhất của Google',
      'Khả năng xử lý văn bản dài và phức tạp hơn (tối đa 1,000,000 token)',
      'Quyền truy cập đầy đủ vào NotebookLM Plus để phân tích tài liệu',
      '2TB dung lượng lưu trữ Google One cho Drive, Gmail và Photos',
      'Khả năng xử lý hình ảnh, âm thanh và video (đa phương thức)',
      'Trợ giúp lập trình và phân tích mã nguồn chuyên sâu',
      'Chia sẻ dung lượng với tối đa 5 thành viên gia đình',
      'Tích hợp với Google Workspace để tăng năng suất làm việc'
    ],
    steps: [
      { title: 'Đăng ký thông tin', description: 'Để lại thông tin để nhận thông báo khi dịch vụ ra mắt tại Việt Nam' },
      { title: 'Nhận thông báo', description: 'Chúng tôi sẽ thông báo ngay khi dịch vụ sẵn sàng' },
      { title: 'Chọn gói', description: 'Lựa chọn gói Google One AI Premium phù hợp với nhu cầu' },
      { title: 'Trải nghiệm', description: 'Truy cập gemini.google.com để bắt đầu sử dụng' }
    ],
    faqs: [
      {
        question: 'Gemini Advanced có liên quan gì đến Google One?',
        answer: 'Gemini Advanced sẽ là một phần của gói Google One AI Premium. Khi đăng ký Google One AI Premium, bạn sẽ nhận được quyền truy cập vào Gemini Advanced, NotebookLM Plus, và 2TB dung lượng lưu trữ đám mây, cùng với các tính năng bảo mật và ưu đãi khác của Google One.'
      },
      {
        question: 'Khi nào Gemini Advanced sẽ ra mắt tại Việt Nam?',
        answer: 'Chúng tôi đang làm việc để đưa Gemini Advanced đến người dùng Việt Nam trong thời gian sớm nhất. Vui lòng đăng ký nhận thông báo để được cập nhật về ngày ra mắt chính thức và các ưu đãi đặc biệt cho người dùng đăng ký sớm.'
      },
      {
        question: 'Gemini Advanced khác gì so với Gemini tiêu chuẩn?',
        answer: 'Gemini Advanced sử dụng mô hình Ultra 1.0, mạnh mẽ hơn đáng kể so với mô hình Pro 1.0 của Gemini tiêu chuẩn. Gemini Advanced có khả năng xử lý các tác vụ phức tạp hơn, hiểu ngữ cảnh sâu hơn, và cung cấp phản hồi chi tiết và chính xác hơn. Nó có thể xử lý đoạn văn bản dài hơn (lên đến 1M token so với 32K) và hiệu quả hơn trong các tác vụ đòi hỏi sự sáng tạo và phân tích chuyên sâu.'
      },
      {
        question: 'Dung lượng 2TB từ Google One AI Premium được sử dụng như thế nào với Gemini Advanced?',
        answer: 'Dung lượng 2TB từ Google One AI Premium giúp bạn lưu trữ các tài liệu, hình ảnh, video và tệp tin khác mà bạn muốn xử lý bằng Gemini Advanced. Ví dụ, bạn có thể lưu trữ các dự án lớn trong Google Drive, sau đó sử dụng Gemini Advanced để phân tích hoặc tạo nội dung dựa trên chúng. Dung lượng này cũng được chia sẻ giữa Google Drive, Gmail và Google Photos.'
      },
      {
        question: 'Tôi có thể chia sẻ quyền truy cập Google One AI Premium với người khác không?',
        answer: 'Có, bạn có thể chia sẻ quyền truy cập Google One AI Premium, bao gồm dung lượng lưu trữ 2TB và các tính năng khác, với tối đa 5 thành viên gia đình thông qua tính năng chia sẻ gia đình của Google. Mỗi thành viên sẽ có không gian riêng tư nhưng chia sẻ dung lượng lưu trữ. Tuy nhiên, quyền truy cập vào Gemini Advanced và NotebookLM Plus có thể có những hạn chế đối với các tài khoản chia sẻ.'
      }
    ]
  }
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Lấy thông tin dịch vụ từ ID
    const serviceData = serviceDetails[serviceId];
    if (serviceData) {
      setService(serviceData);
      // Scroll lên đầu trang
      window.scrollTo(0, 0);
    } else {
      // Chuyển hướng về trang chủ nếu không tìm thấy dịch vụ
      navigate('/');
    }
  }, [serviceId, navigate]);

  if (!service) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Title level={3}>Đang tải thông tin dịch vụ...</Title>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Header Section */}
      <div 
        style={{ 
          background: service.gradient,
          borderRadius: '12px',
          padding: '40px 60px',
          color: 'white',
          marginBottom: '40px',
          position: 'relative'
        }}
      >
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text" 
          style={{ color: 'white', position: 'absolute', top: '20px', left: '20px' }}
          onClick={() => navigate('/')}
        >
          Quay lại
        </Button>

        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'left' }}>
              <Title level={1} style={{ color: 'white', marginBottom: '8px' }}>
                {service.title}
              </Title>
              <Paragraph style={{ color: 'white', fontSize: '18px', marginBottom: '24px' }}>
                {service.subtitle}
              </Paragraph>
              <Paragraph style={{ color: 'white', fontSize: '16px' }}>
                {service.description}
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                borderRadius: '50%',
                padding: '20px',
                width: '200px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ 
                    width: '80%', 
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
                  }} 
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          {/* Tabs */}
          <Card style={{ marginBottom: '24px' }}>
            <Tabs defaultActiveKey="features">
              <TabPane 
                tab={<span><StarOutlined /> Tính năng</span>} 
                key="features"
              >
                <Title level={4} style={{ marginBottom: '20px' }}>Tính năng nổi bật</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={service.features}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: service.color, fontSize: '24px' }} />}
                        title={<span style={{ fontSize: '16px' }}>{item}</span>}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane 
                tab={<span><QuestionCircleOutlined /> Câu hỏi thường gặp</span>} 
                key="faq"
              >
                <Collapse bordered={false} expandIconPosition="right">
                  {service.faqs.map((faq, index) => (
                    <Panel header={<span style={{ fontWeight: 'bold' }}>{faq.question}</span>} key={index}>
                      <Paragraph>{faq.answer}</Paragraph>
                    </Panel>
                  ))}
                </Collapse>
              </TabPane>
              <TabPane 
                tab={<span><LaptopOutlined /> Hướng dẫn sử dụng</span>} 
                key="guide"
              >
                <Title level={4}>Cách sử dụng {service.title}</Title>
                <Paragraph>
                  Sau khi đăng ký và kích hoạt dịch vụ {service.title}, bạn có thể truy cập và quản lý tài khoản của mình qua các bước sau:
                </Paragraph>
                
                <Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
                  <Col span={8}>
                    <Card style={{ textAlign: 'center', height: '100%' }}>
                      <LaptopOutlined style={{ fontSize: '36px', color: service.color, marginBottom: '16px' }} />
                      <Title level={5}>Truy cập trên máy tính</Title>
                      <Paragraph>
                        Truy cập one.google.com và đăng nhập bằng tài khoản Google của bạn để quản lý dung lượng lưu trữ và các tính năng khác.
                      </Paragraph>
                    </Card>
                  </Col>
                  
                  <Col span={8}>
                    <Card style={{ textAlign: 'center', height: '100%' }}>
                      <MobileOutlined style={{ fontSize: '36px', color: service.color, marginBottom: '16px' }} />
                      <Title level={5}>Truy cập trên điện thoại</Title>
                      <Paragraph>
                        Tải ứng dụng Google One từ App Store hoặc Google Play để dễ dàng quản lý tài khoản và sao lưu thiết bị của bạn.
                      </Paragraph>
                    </Card>
                  </Col>
                  
                  <Col span={8}>
                    <Card style={{ textAlign: 'center', height: '100%' }}>
                      <DownloadOutlined style={{ fontSize: '36px', color: service.color, marginBottom: '16px' }} />
                      <Title level={5}>Sao lưu & khôi phục</Title>
                      <Paragraph>
                        Sử dụng tính năng sao lưu tự động để bảo vệ dữ liệu quan trọng trên thiết bị của bạn.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Card>

          {/* Quy trình đăng ký */}
          <Card title="Quy trình đăng ký dịch vụ" style={{ marginBottom: '24px' }}>
            <Steps current={-1} direction="vertical">
              {service.steps.map((step, index) => (
                <Step
                  key={index}
                  title={<span style={{ fontWeight: 'bold' }}>{step.title}</span>}
                  description={step.description}
                />
              ))}
            </Steps>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Pricing Card */}
          <Card 
            title={<span><CreditCardOutlined /> Bảng giá dịch vụ</span>}
            style={{ marginBottom: '24px' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={service.pricing}
              renderItem={item => (
                <List.Item style={{ 
                  padding: '16px',
                  background: item.popular ? `${service.color}10` : 'transparent',
                  borderRadius: '8px',
                  border: item.popular ? `1px solid ${service.color}` : 'none'
                }}>
                  <List.Item.Meta
                    title={
                      <div>
                        <Text strong>{item.name}</Text>
                        {item.popular && (
                          <Tag color={service.color} style={{ marginLeft: '8px' }}>
                            Phổ biến nhất
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
                        <div>
                          {item.originalPrice && (
                            <Text delete type="secondary" style={{ marginRight: '8px' }}>
                              {item.originalPrice}
                            </Text>
                          )}
                          <Text strong style={{ fontSize: '18px', color: service.color }}>
                            {item.price}
                          </Text>
                          {item.discount && (
                            <Tag color="#f50" style={{ marginLeft: '8px' }}>
                              Giảm {item.discount}
                            </Tag>
                          )}
                        </div>
                        <Button 
                          type="primary" 
                          block 
                          style={{ 
                            marginTop: '8px',
                            background: item.popular ? service.color : undefined
                          }}
                        >
                          Đăng ký ngay
                        </Button>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Contact Card */}
          <Card title={<span><PhoneOutlined /> Liên hệ đặt hàng</span>}>
            <Paragraph style={{ fontSize: '16px' }}>
              Để được tư vấn và hỗ trợ đặt hàng, vui lòng liên hệ:
            </Paragraph>
            <Alert
              message={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>Hotline: <a href="tel:0832206397">0832206397</a></span>}
              description="Giờ làm việc: 8:00 - 22:00 (Thứ 2 - Chủ nhật)"
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <Paragraph>
              <strong>Cam kết:</strong>
            </Paragraph>
            <List
              size="small"
              dataSource={[
                'Hỗ trợ cài đặt và hướng dẫn sử dụng',
                'Bảo hành trọn đời tài khoản',
                'Hoàn tiền 100% nếu không hài lòng trong 7 ngày'
              ]}
              renderItem={item => (
                <List.Item>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  {item}
                </List.Item>
              )}
            />
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<PhoneOutlined />}
                href="tel:0832206397"
                block
              >
                Gọi ngay
              </Button>
            </div>
          </Card>

          {/* Bảo mật */}
          <Card
            title={<span><LockOutlined /> Bảo mật & Tin cậy</span>}
            style={{ marginTop: '24px' }}
          >
            <Paragraph>
              <ul>
                <li>Tài khoản chính chủ, sử dụng lâu dài</li>
                <li>Thanh toán an toàn, bảo mật</li>
                <li>Hỗ trợ kỹ thuật 24/7</li>
                <li>Bảo hành trọn đời tài khoản</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceDetailPage; 