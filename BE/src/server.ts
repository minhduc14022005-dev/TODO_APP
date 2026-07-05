import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () =>{
    try{
        console.log("Đang tiến hành kết nối đến Database...");
        await connectDB();
        app.listen(PORT, () => {
            console.log('Server đang chạy tại http://localhost:' + PORT);
        });
    } catch (error) {
        console.error("Lỗi khi khởi động server:", error);
        process.exit(1); // Exit process với mã lỗi 1 để hệ thống biết app đã sập
    }
}
startServer();