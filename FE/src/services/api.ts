import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Thay đổi URL cơ sở nếu cần
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // Thời gian chờ 5 giây
});

export default apiClient;