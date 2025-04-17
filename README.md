# Thế Giới Tài Khoản

Website cung cấp tài khoản dịch vụ chính hãng với giá ưu đãi.

## Cấu hình đăng nhập Google OAuth

Để kích hoạt chức năng đăng nhập bằng Google, bạn cần thực hiện các bước sau:

### 1. Tạo và cấu hình dự án trên Google Cloud Console

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo một dự án mới hoặc chọn dự án hiện có
3. Mở trang **"APIs & Services > Credentials"**
4. Nhấp vào **"Configure Consent Screen"** (nếu chưa cấu hình)
   - Chọn **"External"** (nếu không có G Suite)
   - Điền các thông tin cần thiết như tên ứng dụng, email liên hệ, logo, v.v.
   - Trong phần Scopes, thêm `email` và `profile`
   - Lưu và tiếp tục

### 2. Tạo OAuth Client ID

1. Quay lại trang **"Credentials"**
2. Nhấp vào **"Create Credentials"** và chọn **"OAuth client ID"**
3. Chọn **"Web application"** làm loại ứng dụng
4. Đặt tên cho client ID
5. Thêm Authorized JavaScript origins:
   - `http://localhost:3000` (cho môi trường phát triển)
   - `https://yourdomain.com` (cho môi trường sản xuất)
6. Thêm Authorized redirect URIs:
   - `http://localhost:3000` (cho môi trường phát triển)
   - `https://yourdomain.com` (cho môi trường sản xuất)
7. Nhấp vào **"Create"**

### 3. Cập nhật Client ID trong ứng dụng

1. Sao chép Client ID bạn vừa tạo
2. Mở file `src/index.js`
3. Tìm dòng:
```javascript
const GOOGLE_CLIENT_ID = '123456789-example.apps.googleusercontent.com';
```
4. Thay thế bằng Client ID của bạn:
```javascript
const GOOGLE_CLIENT_ID = 'your-client-id.apps.googleusercontent.com';
```

5. Lưu lại file và khởi động lại ứng dụng

## Chạy ứng dụng

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng ở chế độ phát triển:
```bash
npm start
```

Website sẽ được chạy tại [http://localhost:3000](http://localhost:3000). 