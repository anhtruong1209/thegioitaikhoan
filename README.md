# Thế Giới Tài Khoản

Website cung cấp tài khoản dịch vụ chính hãng với giá ưu đãi.

## Cài đặt biến môi trường

Ứng dụng sử dụng các biến môi trường để bảo mật thông tin nhạy cảm. Để cài đặt:

1. Tạo một file `.env` ở thư mục gốc dự án
2. Sao chép nội dung từ file `.env.example` vào file `.env`
3. Cập nhật các giá trị thực của bạn trong file `.env`

Ví dụ:
```
# API Keys
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_emailjs_key
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id

# Google Authentication
REACT_APP_GOOGLE_CLIENT_ID=your_actual_google_client_id
```

**Lưu ý:** File `.env` đã được thêm vào `.gitignore` để không bị đẩy lên GitHub, đảm bảo thông tin nhạy cảm được bảo mật.

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

### 3. Cập nhật Client ID trong biến môi trường

1. Sao chép Client ID bạn vừa tạo
2. Cập nhật giá trị của `REACT_APP_GOOGLE_CLIENT_ID` trong file `.env`

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

## Deploy lên Vercel

Để deploy lên Vercel:

1. Tạo tài khoản hoặc đăng nhập vào [Vercel](https://vercel.com)
2. Liên kết tài khoản GitHub của bạn
3. Import repository này từ GitHub
4. Cấu hình biến môi trường trong phần "Environment Variables" của dự án trên Vercel, sử dụng các giá trị tương tự như trong file `.env` của bạn
5. Deploy!
