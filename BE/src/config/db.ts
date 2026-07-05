import mongoose from 'mongoose';

/**
 * Hàm kết nối MongoDB Atlas
 * @returns {Promise<void>}
 */
const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        
        // Bắt lỗi ngay nếu quên cấu hình file .env
        if (!mongoURI) {
            throw new Error("Chưa định nghĩa MONGO_URI trong file .env!");
        }

        // Thực hiện kết nối
        const conn = await mongoose.connect(mongoURI);
        
        console.log(`MongoDB Atlas đang chạy tại: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Lỗi kết nối Database: ${error.message}`);
        } else {
            console.error(`Lỗi kết nối không xác định!`);
        }
        process.exit(1); 
    }
};

export default connectDB;