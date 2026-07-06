# GIAI ĐOẠN 1: Build code React
FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Chạy lệnh dịch code từ React sang HTML/CSS/JS tĩnh (thư mục dist)
RUN npm run build

# GIAI ĐOẠN 2: Chạy web bằng NGINX
FROM nginx:alpine
# Lấy các file đã dịch ở giai đoạn 1, quăng vào thư mục gốc của NGINX
COPY --from=builder /app/dist /usr/share/nginx/html
# Mở cổng 80 (cổng mặc định của web)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
