# 📝 Todo List Application (Intern/Fresher Assessment)

🌍 **Live Demo:** [https://todo-app-seven-delta-57.vercel.app](https://todo-app-seven-delta-57.vercel.app)

Một ứng dụng quản lý công việc (Todo List) Fullstack được phát triển với kiến trúc hệ thống chuẩn mực, áp dụng các kỹ thuật tối ưu hóa trải nghiệm người dùng (UX) và hiệu năng (Performance) thực tế của doanh nghiệp.

## 🚀 Tính năng & Kỹ thuật nổi bật

### 💻 Frontend (React + Vite + TypeScript)
- **Kiến trúc & UI/UX**: Phát triển dựa trên Component-based, sử dụng TailwindCSS thiết kế giao diện Clean, Minimal và Responsive. Quản lý trạng thái thông báo với `react-toastify`.
- **Optimistic UI Update**: Cập nhật trạng thái công việc (Hoàn thành/Chưa hoàn thành) ngay lập tức trên giao diện trước khi gọi API ngầm. Tự động Rollback nếu có lỗi mạng, mang lại cảm giác phản hồi 0ms.
- **Advanced Debounce State**: Áp dụng kỹ thuật tách State để Debounce (500ms) riêng biệt cho ô Tìm kiếm nhằm chống Spam Server, nhưng vẫn đảm bảo Phân trang và Bộ lọc phản hồi tức thì.
- **Custom Modals**: Tự thiết kế các hộp thoại đa dụng (Form tạo/sửa công việc, Xác nhận Xóa) chuyên nghiệp, loại bỏ hoàn toàn các native popup (alert, confirm) của trình duyệt.
- **Custom Hooks (`useTasks`)**: Gom cụm toàn bộ logic phức tạp (API calls, State, Loading, Pagination) giúp Component UI luôn sạch sẽ và dễ bảo trì.

### ⚙️ Backend (Node.js + Express + TypeScript)
- **Kiến trúc MVC + Dependency Injection**: Phân tách rõ ràng luồng dữ liệu (Controller - Service - Model). Áp dụng Dependency Injection để dễ dàng mở rộng và viết Unit Test độc lập.
- **Validation chặt chẽ**: Bắt lỗi mọi Edge Cases (Độ dài chuỗi, ID không hợp lệ, dữ liệu rỗng) ngay từ Middleware và lõi Mongoose Database.
- **Pagination & Filtering**: Hỗ trợ phân trang, tìm kiếm theo tên và lọc theo trạng thái để tối ưu hóa truy vấn khối lượng dữ liệu lớn.
- **Unit Testing**: Phủ Test cho tầng Controller bằng `Jest` thông qua kỹ thuật Mocking, đảm bảo độ ổn định của API.

## 🛠 Tech Stack

- **Frontend:** React.js, TypeScript, Vite, TailwindCSS, Axios, React Toastify.
- **Backend:** Node.js, Express, TypeScript, Mongoose.
- **Database:** MongoDB.
- **Testing:** Jest, ts-jest.
- **DevOps:** Docker, Docker Compose, NGINX.

## 📦 Hướng dẫn cài đặt (Installation)

### Cách 1: Chạy bằng Docker (Khuyên dùng 🌟)
Chỉ với 1 câu lệnh duy nhất, toàn bộ hệ thống (Database + Backend + Frontend tĩnh qua Nginx) sẽ tự động liên kết và khởi chạy ngầm. Môi trường sạch sẽ 100%.

```bash
# Build và chạy ngầm bằng Docker Compose
docker-compose up -d --build
```
- **Frontend** truy cập tại: `http://localhost:3000`
- **Backend API** chạy tại: `http://localhost:8000/api`

### Cách 2: Chạy thủ công (Local Development)

**1. Setup Backend:**
```bash
cd BE
npm install
```
- Tạo file `.env` trong thư mục `BE` dựa trên file `.env.example` và điền `MONGO_URI`.
- Khởi động server (dev): `npm run dev`

**2. Setup Frontend:**
```bash
cd FE
npm install
# Khởi động giao diện
npm run dev
```

## 🧪 Chạy Unit Test (Backend)
```bash
cd BE
npm run test
```

## 👨‍💻 Tác giả
- Phát triển bởi: **[Tên Của Bạn]**
- Vị trí ứng tuyển: Thực tập sinh / Fresher Fullstack Developer
