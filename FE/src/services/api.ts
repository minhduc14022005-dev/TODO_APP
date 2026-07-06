import axios from 'axios';

const apiClient = axios.create({
    // Sử dụng biến môi trường khi Deploy lên Vercel, nếu chạy Local thì dùng localhost:8000
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Tăng lên 10 giây vì Server miễn phí thường mất thời gian "thức dậy"
});

export default apiClient;