# Dùng môi trường Node.js phiên bản nhỏ gọn (alpine) để image nhẹ
FROM node:22-alpine

# Tạo thư mục làm việc tên là /app bên trong Container
WORKDIR /app

# Copy các file cấu hình thư viện vào trước
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ code BE vào Container
COPY . .

# Khai báo cổng mà Backend sẽ chạy
EXPOSE 5000

# Lệnh khởi động server
CMD ["npm", "start"]
