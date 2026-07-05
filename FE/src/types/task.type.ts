/*
* Interface cho một task
* Nó định nghĩa các thuộc tính cơ bản của một task, bao gồm tiêu đề, mô tả, trạng thái hoàn thành và các thông tin thời gian.
*/
export interface ITask {
    _id: string; 
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: string; // Sử dụng string để phù hợp với dữ liệu JSON trả về từ API
    updatedAt: string; // Sử dụng string để phù hợp với dữ liệu JSON trả về từ API
}

/*
* Interface cho các tham số truy vấn khi lấy danh sách task
* Nó cho phép lọc theo trạng thái hoàn thành, tìm kiếm theo tiêu đề, phân trang và giới hạn số lượng task trả về.
*/
export interface ITaskQuery {
    search?: string;
    isCompleted?: boolean;
    page?: number;
    limit?: number;
}

/*
* Interface cho phản hồi phân trang khi lấy danh sách task
* Nó bao gồm danh sách các task và thông tin phân trang như tổng số task, tổng số trang, trang hiện tại và kích thước trang.
*/
export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    pagination?: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
}