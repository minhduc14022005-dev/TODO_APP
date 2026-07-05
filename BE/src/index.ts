import connectDB from './config/db';

const startServer = async () => {
    console.log("Đang tiến hành kết nối đến Database...");
    await connectDB();
    console.log("Sẵn sàng để viết API cho Todo List rồi em!");
};

startServer();